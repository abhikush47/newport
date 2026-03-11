import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

export default function GlassBlogCard({ blog, onClick }: any) {

const ref = useRef<HTMLDivElement>(null);

const x = useMotionValue(0);
const y = useMotionValue(0);

const mouseX = useSpring(x);
const mouseY = useSpring(y);

const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

function handleMouseMove(e: any) {

if (!ref.current) return;

const rect = ref.current.getBoundingClientRect();

const width = rect.width;
const height = rect.height;

const mouseXPos = e.clientX - rect.left;
const mouseYPos = e.clientY - rect.top;

x.set(mouseXPos / width - 0.5);
y.set(mouseYPos / height - 0.5);
}

function handleMouseLeave() {
x.set(0);
y.set(0);
}

return (

<motion.div
ref={ref}
onMouseMove={handleMouseMove}
onMouseLeave={handleMouseLeave}
onClick={onClick}
style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
className="relative w-full max-w-[360px] rounded-3xl overflow-hidden cursor-pointer group"
>

{/* Glow border */}
<div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"
style={{boxShadow:`0 0 80px ${blog.color}40`}}
/>

{/* Glass Card */}
<div
className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
style={{ transform: "translateZ(40px)" }}
>

{/* Image */}
<div className="relative overflow-hidden">

<img
src={blog.image}
className="h-[220px] w-full object-cover group-hover:scale-110 transition duration-700"
/>

<span
style={{ background: blog.color }}
className="absolute top-4 left-4 text-xs px-3 py-1 rounded text-black font-semibold"
>
{blog.category}
</span>

</div>

{/* Content */}
<div className="p-6">

<div className="flex gap-4 text-xs text-gray-400 mb-3">

<span className="flex items-center gap-1">
<Calendar size={14}/>
{blog.date}
</span>

<span className="flex items-center gap-1">
<Clock size={14}/>
{blog.read}
</span>

</div>

<h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition">
{blog.title}
</h3>

<p className="text-gray-400 text-sm mb-6">
{blog.description}
</p>

<div className="border-t border-white/10 pt-4 text-yellow-400 text-sm font-semibold">
READ MORE →
</div>

</div>

</div>

</motion.div>

);

}