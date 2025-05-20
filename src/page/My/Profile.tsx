import { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/my";
// Make sure to import updateProfile from the correct module if it exists elsewhere
// import { updateProfile } from "correct-path";
import ClipLoader from "react-spinners/ClipLoader";
import { getMyList } from "../../api/stories";
import { IStory } from "../../type/comic";
import CardComicDetail from "../../components/card/CardComicDetail";
import { FaMoneyBill } from "react-icons/fa";

export const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
  console.log("🚀 ~ Profile ~ data:", data);
  const {
    data: st,
    isLoading: loading,
    error: err,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => getMyList(),
  });

  // Add Update Form State
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formState, setFormState] = useState({
    currentPassword: '',
    fullName: '',
    dateOfBirth: '',
  });
  type FormErrors = {
    currentPassword?: string;
    fullName?: string;
    dateOfBirth?: string;
  };
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormLoading, setIsFormLoading] = useState(false);
  type Notification = { type: 'success' | 'error' | 'info'; message: string };
  const [notification, setNotification] = useState<Notification | null>(null);
  const passwordRef = useRef(null);

  // Set initial form data when profile loads
  useEffect(() => {
    if (data?.result) {
      setFormState(prev => ({
        ...prev,
        fullName: data.result.fullName,
        dateOfBirth: data.result.dateOfBirth,
      }));
    }
  }, [data]);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (error || err) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Failed to load profile or stories.</p>
      </div>
    );
  }

  async function updateProfile({
    currentPassword,
    fullName,
    dateOfBirth,
  }: { currentPassword: string; fullName: string; dateOfBirth: string; }) {
    try {
      const response = await fetch('/api/my/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          fullName,
          dateOfBirth,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, message: data.message || "Profile updated." };
      } else {
        return { success: false, message: data.message || "Failed to update profile." };
      }
    } catch (error: any) {
      return { success: false, message: error?.message || "Network error." };
    }
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    setErrors({});
    setNotification(null);

    // Validate fields
    const newErrors: FormErrors = {};
    if (!formState.currentPassword) newErrors.currentPassword = "Current password is required.";
    if (!formState.fullName) newErrors.fullName = "Full name is required.";
    if (!formState.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsFormLoading(true);
    try {
      // Assume updateProfile API exists and returns { success, message }
      const res = await updateProfile({
        currentPassword: formState.currentPassword,
        fullName: formState.fullName,
        dateOfBirth: formState.dateOfBirth,
      });

      if (res.success) {
        setNotification({ type: "success", message: "Profile updated successfully!" });
        setShowUpdateForm(false);
        // Optionally refetch profile data here
      } else {
        setNotification({ type: "error", message: res.message || "Update failed." });
      }
    } catch (err: any) {
      setNotification({ type: "error", message: err?.message || "An error occurred." });
    } finally {
      setIsFormLoading(false);
    }
  }

  return (
    <div className=" ">
      {/* Banner */}
      <div
        className="absolute top-14 left-0 right-0 h-60 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://t4.ftcdn.net/jpg/08/50/30/01/360_F_850300178_2R0d9z8EiG6hN8Yj5QaBEYJAEVFflJly.jpg')`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 z-10 mt-16 flex flex-wrap">
        {/* Avatar + Info */}
        <div className="flex items-center space-x-6 z-10">
          <img
            src={
              data.result.imageUrl ||
              "https://media.tenor.com/7JTQjJOqlfQAAAAM/cats-cat-animation.gif"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-800 bg-white z-10"
          />
          <div className="z-10 bg-black/50 backdrop-blur-md p-4 rounded-lg shadow-md text-white">
            <h1 className="text-3xl font-bold">{data.result.fullName}</h1>
            <p className="text-sm text-gray-400">{data.result.dateOfBirth}</p>
            <p className="text-sm text-gray-400">{data.result.email}</p>
            <p className="text-xl text-green-500 flex items-center gap-2">
              {data.result.balance} <FaMoneyBill />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 px-4 max-w-5xl mx-auto mb-2">
        <h2 className="text-xl font-semibold mb-4">Danh sách truyện của bạn</h2>
        <div className="grid flex sm:grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
          {st?.data.map((item: IStory) => (
            <CardComicDetail key={item.id} data={item} />
          ))}
        </div>
      </div>

      {/* Add Update Profile Button */}
      <div className="max-w-5xl mx-auto px-4 z-10 mt-4">
        <button
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showUpdateForm ? 'Hide Update Form' : 'Update Profile'}
        </button>
      </div>

      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="max-w-5xl mx-auto px-4 mt-8 mb-8">
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-white">Update Profile</h2>
            
            {notification && (
              <div 
                className={`mb-4 p-3 rounded-md ${
                  notification.type === 'success' ? 'bg-green-100 text-green-800' : 
                  notification.type === 'error' ? 'bg-red-100 text-red-800' : 
                  'bg-blue-100 text-blue-800'
                }`}
              >
                {notification.message}
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  ref={passwordRef}
                  value={formState.currentPassword}
                  onChange={(e) => setFormState({...formState, currentPassword: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.currentPassword && (
                  <p className="mt-1 text-xs text-red-400">{errors.currentPassword}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) => setFormState({...formState, fullName: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${
                    errors.fullName ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formState.dateOfBirth}
                  onChange={(e) => setFormState({...formState, dateOfBirth: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md bg-gray-700 text-white ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-400">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isFormLoading}
                  className={`px-4 py-2 rounded-md ${
                    isFormLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors flex items-center`}
                >
                  {isFormLoading ? (
                    <>
                      <ClipLoader size={16} color={"#ffffff"} className="mr-2" />
                      Processing...
                    </>
                  ) : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
function updateProfile(arg0: { currentPassword: string; fullName: string; dateOfBirth: string; }) {
  throw new Error('Function not implemented.');
}

