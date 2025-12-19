import {
  useCurrentFrame,
  interpolate,
  Easing,
  staticFile,
  Img,
} from "remotion";
import { Lottie } from "@remotion/lottie";
import { useLottie } from "../hooks/useLottie";

interface Product {
  name: string;
  quantity: number;
  value: string | number;
}

interface TopProductsProps {
  products?: Product[];
}

function ProductCard({
  product,
  delay,
  index,
}: {
  product: Product;
  delay: number;
  index: number;
}) {
  const frame = useCurrentFrame();
  const animationDuration = 40;
  const staggerDelay = delay + index * 15;

  const opacity = interpolate(
    frame,
    [staggerDelay, staggerDelay + animationDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [staggerDelay, staggerDelay + animationDuration],
    [0.8, 1],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(
    frame,
    [staggerDelay, staggerDelay + animationDuration],
    [50, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      className="flex items-center justify-between p-6 rounded-2xl border-2 border-[#FFB088]/30 w-full"
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        background:
          "linear-gradient(135deg, rgba(255, 176, 136, 0.2) 0%, rgba(255, 176, 136, 0.1) 100%)",
      }}
    >
      {/* Rank Number */}
      <div className="text-[80px] font-bold text-[#FFB088] w-[100px]">
        #{index + 1}
      </div>

      {/* Product Name */}
      <div className="flex-1 text-[50px] font-bold text-left px-8">
        {product.name}
      </div>

      {/* Stats */}
      <div className="flex gap-12 items-center">
        {/* Quantity */}
        <div className="flex flex-col items-center">
          <div className="text-[30px] text-gray-300 mb-2">Vendidos</div>
          <div className="text-[50px] font-bold">{product.quantity}</div>
        </div>

        {/* Value */}
        <div className="flex flex-col items-center">
          <div className="text-[30px] text-gray-300 mb-2">Receita</div>
          <div className="text-[50px] font-bold text-[#FFB088]">
            {product.value}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopProducts({
  products = [
    { name: "Camiseta Premium", quantity: 245, value: "$12.3K" },
    { name: "Tênis Esportivo", quantity: 189, value: "$18.9K" },
    { name: "Relógio Smart", quantity: 156, value: "$23.4K" },
  ],
}: TopProductsProps) {
  const frame = useCurrentFrame();

  // Title animation
  const titleDelay = 0;
  const titleDuration = 60;
  const cardsDelay = titleDelay + titleDuration + 20;

  const titleOpacity = interpolate(
    frame,
    [titleDelay, titleDelay + titleDuration / 2],
    [0, 1],
    {
      easing: Easing.out(Easing.ease),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const titleTranslateY = interpolate(
    frame,
    [titleDelay, titleDelay + titleDuration],
    [100, 0],
    {
      easing: Easing.out(Easing.back(1.2)),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const fireAnimationData = useLottie("/lottie/fire.json");

  return (
    <div className="w-full h-full relative">
      <Img
        src={staticFile("Inbazz-Background.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />
      <div
        className="flex flex-col items-center justify-center w-full h-full p-16 relative"
        style={{ zIndex: 2 }}
      >
        {/* Title */}
        <div
          className="text-[80px] font-bold mb-16 text-center flex items-center gap-6"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          <span>Seus produtos mais vendidos</span>
          {fireAnimationData && (
            <Lottie
              animationData={fireAnimationData}
              className="inline-block"
              style={{ width: 100, height: 100 }}
              loop
            />
          )}
        </div>

        {/* Products List */}
        <div className="flex flex-col gap-8 w-full max-w-[1600px]">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              delay={cardsDelay}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
