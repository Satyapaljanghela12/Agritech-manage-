import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Sprout, Droplets, Sun, TrendingUp, Shield, Leaf, LayoutDashboard, LineChart } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number;
  incrementY?: number;
  incrementZ?: number;
}

const ContainerScroll = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        style={{ perspective: "1000px", ...props.style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ index, incrementY = 10, incrementZ = 10, children, className, style, ...props }, ref) => {
    const y = index * incrementY;
    const z = index * incrementZ;
    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top: y,
          z,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

const AGRICULTURE_SOLUTIONS = [
  {
    id: "solution-1",
    title: "Central Dashboard",
    description: "All your farm data in one place. Access everything from crops to resources with a single click. Monitor your entire operation from a unified interface.",
    icon: LayoutDashboard,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "solution-2",
    title: "Real-time Analytics",
    description: "Make data-driven decisions with live insights, trends, and predictive analytics. Our precision farming solutions help you optimize resource allocation.",
    icon: LineChart,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "solution-3",
    title: "Smart Irrigation Systems",
    description: "Optimize water usage with AI-powered irrigation systems that monitor soil moisture, weather patterns, and crop needs in real-time. Reduce water waste by up to 40%.",
    icon: Droplets,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "solution-4",
    title: "Crop Health Monitoring",
    description: "Advanced sensors and drone technology provide real-time insights into crop health, pest detection, and disease prevention. Early detection systems protect your harvest.",
    icon: Leaf,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "solution-5",
    title: "Climate-Smart Agriculture",
    description: "Adapt to changing climate conditions with weather forecasting tools and climate-resilient farming practices. Mitigate risks and maintain productivity.",
    icon: Sun,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    id: "solution-6",
    title: "Sustainable Pest Management",
    description: "Implement eco-friendly pest control strategies that protect your crops while preserving the environment. Reduce chemical usage and promote biodiversity.",
    icon: Shield,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
];

export const SolutionSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 xl:px-12">
        <motion.div
          className="mb-16 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              <Sprout className="h-4 w-4" />
              Our Solutions
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            The Digital{" "}
            <span className="text-green-600">Solution</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-lg text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Transform your farming operations with cutting-edge technology designed
            to increase productivity, reduce costs, and promote sustainable
            agricultural practices for a better tomorrow.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="left-0 top-0 md:sticky md:h-screen md:py-12">
            <div className="flex h-full flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h3 
                  className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Empowering Farmers with{" "}
                  <span className="text-green-600">Smart Technology</span>
                </h3>
                <p 
                  className="text-lg text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Our comprehensive suite of agricultural solutions combines
                  traditional farming wisdom with modern technology to help you
                  achieve optimal results while caring for the environment.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>40%</div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Increased Yield</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <Droplets className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>50%</div>
                      <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Water Saved</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <ContainerScroll className="min-h-[400vh] space-y-6 py-12">
            {AGRICULTURE_SOLUTIONS.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <CardSticky
                  key={solution.id}
                  index={index + 1}
                  incrementY={20}
                  className={cn(
                    "rounded-2xl border-2 bg-white p-8 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl",
                    solution.color
                  )}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className={cn("rounded-xl bg-white p-3 shadow-sm", solution.iconColor)}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-700 shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 
                    className="mb-4 text-2xl font-bold tracking-tight text-gray-900"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {solution.title}
                  </h3>
                  <p 
                    className="leading-relaxed text-gray-700"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {solution.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-600">
                    <span>Learn more</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardSticky>
              );
            })}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
};


