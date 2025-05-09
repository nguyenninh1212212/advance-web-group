import CardTitle from "../../components/card/CardTitle";
import {
  getSubsctiption,
  TakeSubscriptionPlan,
  TakeSubscriptionPlanRole,
} from "../../api/subscription";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../../util/ToastContext";
import { useTheme } from "../../util/theme/theme";
import { useState } from "react";
import AreYouSure from "../../components/popup/AreYouSure";

const SubscriptionPlan = () => {
  const { background_card } = useTheme();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { showToast } = useToast();
  const {
    data,
    isLoading,
    error,
    refetch, // ✅ thêm refetch
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubsctiption(),
  });
  console.log("🚀 ~ SubscriptionPlan ~ data:", data);

  const mutation = useMutation({
    mutationFn: (id: string) => TakeSubscriptionPlan(id),
    onSuccess: () => {
      showToast("Đăng ký thành công", "success");
      refetch();
      setOpen(false);
    },
    onError: (error) => {
      showToast("Đăng ký thất bại: " + error, "error");
    },
  });
  const mutation2 = useMutation({
    mutationFn: () => TakeSubscriptionPlanRole(),
    onSuccess: () => {
      showToast("Đăng ký thành công", "success");
      refetch();
      setOpen2(false);
    },
    onError: (error) => {
      showToast("Đăng ký thất bại: " + error, "error");
    },
  });

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center">Lỗi khi tải dữ liệu</div>;

  interface Plan {
    id: string;
    name: string;
    duration: string;
    highlight: string;
    price: string;
    perMonth: string;
    buttonText: string;
    color: string;
    badgeColor: string;
    tag: string | null;
    subText?: string;
    active: boolean;
  }

  const dynamicPlans: Plan[] = data?.result?.plans.map((item: any) => {
    return {
      id: item.id,
      name: item.type,
      duration: item.expired + " days",
      price: `$${item.price.toFixed(2)}`,
      perMonth: `$${item.price.toFixed(2)}/mo`,
      buttonText: "Subscribe now",
      color: background_card,
      badgeColor: "bg-green-600",
      tag: item.type === "PREMIUM" ? "BEST VALUE" : null,
      active: item.active,
    };
  });
  const author = data?.result?.author_role;

  const hasActivePlan = dynamicPlans.some((plan) => plan.active);
  const handleBuy = (id: string) => {
    setOpen(!open);
    mutation.mutate(id);
  };

  console.log("🚀 ~ SubscriptionPlan ~ author.author_role.price:", author);
  return (
    <>
      <CardTitle title="Gói nâng cấp" />
      <div className="p-6 text-white flex justify-center items-start gap-8 flex-wrap">
        {dynamicPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-900 w-full md:w-64 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                {plan.tag && (
                  <span
                    className={`text-xs text-white px-2 py-1 rounded ${plan.badgeColor}`}
                  >
                    {plan.tag}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-300 mb-1">{plan.duration}</div>

              <div className="text-3xl font-bold">{plan.price}</div>
              <div className="text-sm text-gray-400">{plan.perMonth}</div>
              <hr className="my-4 border-gray-600" />
            </div>
            <button
              disabled={plan.active || hasActivePlan}
              className={`mt-4 w-full ${
                plan.active
                  ? "bg-stone-500"
                  : hasActivePlan
                  ? "bg-gray-700 cursor-not-allowed"
                  : `${plan.color} hover:opacity-90`
              } py-2 rounded-xl font-semibold transition`}
              onClick={() => setOpen(!open)}
            >
              {plan.active
                ? "Đã đăng ký"
                : hasActivePlan
                ? "Chỉ được chọn 1 gói"
                : plan.buttonText}
            </button>
            <AreYouSure
              onCancel={() => setOpen(!open)}
              onConfirm={() => handleBuy(plan.id)}
              visible={open}
              message={"Bạn có chắc mua gói " + plan.name + "không ?"}
            />

            <p className="text-xs text-center text-gray-300 mt-2">
              {plan.subText}
            </p>
          </div>
        ))}

        {
          <div className="bg-gray-900 w-full md:w-64 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">
                  Đăng ký để trở thành nhà viết truyện
                </h2>
              </div>
              <div className="text-3xl font-bold">${author.price}</div>
              <div className="text-sm text-gray-400">Vĩnh viễn</div>
              <hr className="my-4 border-gray-600" />
            </div>
            <button
              disabled={author.author_role}
              className={`mt-4 w-full ${
                author.author_role
                  ? "bg-stone-500"
                  : `bg-red-500 hover:opacity-90`
              } py-2 rounded-xl font-semibold transition`}
              onClick={() => setOpen(!open)}
            >
              {author.author_role ? "Đã đăng ký" : "Đăng ký"}
            </button>
            <AreYouSure
              onCancel={() => setOpen2(!open)}
              onConfirm={() => {
                mutation2.mutate();
              }}
              visible={open2}
              message={"Bạn có chắc mua gói " + "không ?"}
            />
          </div>
        }
      </div>
    </>
  );
};

export default SubscriptionPlan;
