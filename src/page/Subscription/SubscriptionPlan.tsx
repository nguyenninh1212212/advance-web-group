import React from "react";
import { FaGem } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import CardTitle from "../../components/card/CardTitle";

const plans = [
  {
    name: "PREMIUM",
    tag: "BEST VALUE",
    duration: "1 Month +",
    highlight: "125 Gems SAVE 60%",
    oldPrice: "$17.49",
    price: "$9.99",
    perMonth: "$9.99/mo",
    benefits: [
      "Instant & full access to 300+ titles in subscription library",
      "Save 30% on Gems with monthly offer",
      "125 Gems added every month (no expiration)",
    ],
    buttonText: "Subscribe & get 125 Gems now",
    subText: "For US$9.99, billed every 1 month",
    color: "bg-pink-500",
    badgeColor: "bg-green-600",
  },
  {
    name: "STANDARD",
    tag: null,
    duration: "1 Month",
    price: "$4.99",
    perMonth: "$4.99/mo",
    benefits: [
      "Instant & full access to 300+ titles in subscription library",
      "Save 30% on Gems with monthly offer",
    ],
    buttonText: "Subscribe now",
    subText: "For US$4.99, billed every 1 month",
    color: "bg-indigo-500",
  },
];

const SubscriptionPlan = () => {
  return (
    <>
      <CardTitle title="Gói nâng cấp" />
      <div className=" p-6 text-white flex justify-center items-start gap-8 flex-wrap">
        {plans.map((plan, index) => (
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
              {plan.oldPrice && (
                <div className="line-through text-gray-400">
                  {plan.oldPrice}
                </div>
              )}
              <div className="text-3xl font-bold">{plan.price}</div>
              <div className="text-sm text-gray-400">{plan.perMonth}</div>
              <hr className="my-4 border-gray-600" />
              <ul className="space-y-2 text-sm">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {benefit.includes("access") ? (
                      <MdLibraryBooks className="text-indigo-400 mt-1" />
                    ) : (
                      <FaGem className="text-pink-400 mt-1" />
                    )}
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`mt-4 w-full ${plan.color} py-2 rounded-xl font-semibold hover:opacity-90 transition`}
            >
              {plan.buttonText}
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
