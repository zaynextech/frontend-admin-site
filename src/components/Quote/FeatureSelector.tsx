interface Props {
  value: string[];

  onChange: (
    value: string[]
  ) => void;
}

const features = [
  "Admin Dashboard",
  "User Login",
  "Payment System",
  "Booking System",
  "Contact Form",
  "Live Chat",
  "Notifications",
  "Analytics Dashboard",
  "File Upload",
  "Search Function",
  "Multi Language",
  "Dark Mode",
  "Mobile Responsive",
  "SEO Optimization",
  "Blog System",
  "E-Commerce Store",
  "Inventory Management",
];

const FeatureSelector = ({
  value,
  onChange,
}: Props) => {

  const toggleFeature = (
    feature: string
  ) => {

    if (
      value.includes(feature)
    ) {

      onChange(
        value.filter(
          (item) =>
            item !== feature
        )
      );

    } else {

      onChange([
        ...value,
        feature,
      ]);

    }
  };

  return (
    <div className="col-span-full">

      <p className="mb-4 text-sm font-semibold text-zinc-300">

        Project Capabilities

      </p>

      <div className="flex flex-wrap gap-3">

        {features.map(
          (feature) => {

            const active =
              value.includes(
                feature
              );

            return (
              <button
                type="button"

                key={feature}

                onClick={() =>
                  toggleFeature(
                    feature
                  )
                }

                className={`rounded-xl border px-4 py-2 text-sm transition-all

                ${
                  active
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-black/20 text-zinc-400"
                }`}
              >

                {feature}

              </button>
            );
          }
        )}

      </div>

    </div>
  );
};

export default FeatureSelector;