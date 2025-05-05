import CardTitle from "../../components/card/CardTitle";
import { getSubsctiption, TakeSubscriptionPlan } from "../../api/subscription";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../../util/ToastContext";
import { useTheme } from "../../util/theme/theme";

const SubscriptionPlan = () => {
  const { background_card } = useTheme();

  const { showToast } = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => getSubsctiption(),
  });
  console.log("🚀 ~ SubscriptionPlan ~ error:", error);
  console.log("🚀 ~ SubscriptionPlan ~ data:", data);

  const mutation = useMutation({
    mutationFn: (id: string) => TakeSubscriptionPlan(id),
    onSuccess: () => {
      showToast("Đăng ký thành công", "success");
    },
    onError: (error) => {
      showToast("Đăng ký thất bại" + error, "error");
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

  const dynamicPlans: Plan[] = data?.result?.map((item: any) => {
    return {
      id: item.id,
      name: item.type,
      duration: item.expired + " days",
      highlight: `${item.price} Coins SAVE 60%`, // Giả sử thêm thông tin tuỳ biến
      price: `$${item.price.toFixed(2)}`,
      perMonth: `$${item.price.toFixed(2)}/mo`,
      buttonText: "Subscribe now",
      color: background_card,
      badgeColor: "bg-green-600",
      tag: item.type === "PREMIUM" ? "BEST VALUE" : null,
      active: item.active,
    };
  });

  const hasActivePlan = dynamicPlans.some((plan) => plan.active);

  return (
    <>
      <CardTitle title="Gói nâng cấp" />
      <div className="p-6 text-white flex justify-center items-start gap-8 flex-wrap">
        {dynamicPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-900 w-full md:w-80 p-6 rounded-2xl shadow-lg flex flex-col justify-between"
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
              {plan.highlight && (
                <div className="text-sm text-green-400 mb-2">
                  {plan.highlight}
                </div>
              )}
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
              onClick={() => mutation.mutate(plan.id)}
            >
              {plan.active
                ? "Đã đăng ký"
                : hasActivePlan
                ? "Chỉ được chọn 1 gói"
                : plan.buttonText}
            </button>

            <p className="text-xs text-center text-gray-300 mt-2">
              {plan.subText}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubscriptionPlan;
