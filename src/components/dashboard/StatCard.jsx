// components/dashboard/StatCard.jsx
import { Card, CardHeader, CardTitle, CardDescription } from "@heroui/react";

const StatCard = ({ title, count, icon: Icon }) => {
  return (
    <Card className="w-full max-w-[300px] bg-[#121214] border border-stone-800 hover:border-stone-600 transition-colors shadow-none p-2 rounded-xl">
      <CardHeader className="flex flex-col items-start gap-3 p-4">
        <div className="p-2 bg-stone-800/50 w-fit rounded-lg text-violet-400">
          {Icon && <Icon size={20} />}
        </div>
        <div className="space-y-0.5">
          <CardTitle className="text-[10px] text-stone-500 font-bold tracking-widest uppercase">
            {title}
          </CardTitle>
          <CardDescription className="text-xl font-extrabold text-white">
            {count}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StatCard;