import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

import {
  X,
  ExternalLink,
  Zap,
  Layers,
  Globe,
  Check
} from "lucide-react";

import lwangblack from "../assets/lwangblack.png";
import roy from "../assets/roy.png";
import ruden from "../assets/ruden.png";

const projects = [
{
id: 1,
title: "Roy Entertainment Website",
color: "#f87060",
mockup: roy,
link: "https://roy-entertainment-gamma.vercel.app",

tags: ["WEBSITE","BRANDING","BUSINESS"],

description:
"A modern entertainment website designed to showcase services and bookings.",

problem:
"Roy Entertainment needed a professional digital presence where customers could explore services and contact them easily.",

architecture:
"Built a responsive website optimized for performance, SEO, and business presentation.",

metrics: [
"Modern responsive UI",
"Clear services showcase",
"Improved brand credibility"
]
},

{
id: 2,
title: "Lwang Black Website",
color: "#cdd7d6",
mockup: lwangblack,
link: "https://www.lwangblack.com.au",

tags: ["BRAND","DESIGN","WEBSITE"],

description:
"A premium brand website designed to represent the Lwang Black identity.",

problem:
"The brand needed a strong digital presence with premium design and clear product showcase.",

architecture:
"Developed a responsive brand website with elegant typography and product presentation.",

metrics: [
"Premium brand design",
"Product showcase layout",
"Responsive UI system"
]
},

{
id: 3,
title: "Ruden Fitness- Elite Personal Training Platform",
color: "#8B5CF6",
mockup: ruden,
link: "https://ruden.vercel.app/",

tags: ["PT","SAAS","WEB APP"],

description:
"A fitness platform for elite personal training services.",

problem:
"Fitness enthusiasts needed an easy interface to access personalized training programs and track their progress.",

architecture:
"Built a web dashboard analyzing user data to generate customized training plans.",

metrics: [
"Data-driven training plans",
"Interactive fitness dashboard",
"Clean analytics interface"
]
}
];

function TiltCard({
project,
onClick
}:{
project:any;
onClick:()=>void;
}){

const ref = useRef<HTMLDivElement>(null);

const x = useMotionValue(0);
const y = useMotionValue(0);

const mouseXSpring = useSpring(x);
const mouseYSpring = useSpring(y);

const rotateX = useTransform(mouseYSpring,[-0.5,0.5],["10deg","-10deg"]);
const rotateY = useTransform(mouseXSpring,[-0.5,0.5],["-10deg","10deg"]);

const handleMouseMove = (e:any)=>{
if(!ref.current) return;

const rect = ref.current.getBoundingClientRect();

const width = rect.width;
const height = rect.height;

const mouseX = e.clientX - rect.left;
const mouseY = e.clientY - rect.top;

x.set(mouseX/width - 0.5);
y.set(mouseY/height - 0.5);
};

const handleMouseLeave = ()=>{
x.set(0);
y.set(0);
};

return(

<motion.div
ref={ref}
onMouseMove={handleMouseMove}
onMouseLeave={handleMouseLeave}
onClick={onClick}
style={{rotateX,rotateY,transformStyle:"preserve-3d"}}
className="relative w-[300px] sm:w-[320px] h-[420px] rounded-3xl overflow-hidden border border-white/10 cursor-pointer shadow-2xl group"
>

<div style={{transform:"translateZ(30px)"}} className="absolute inset-0">

<img
src={project.mockup}
className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

</div>

<div
style={{transform:"translateZ(60px)"}}
className="absolute bottom-0 p-5"
>

<h3 className="text-lg font-bold text-white mb-2">
{project.title}
</h3>

<p className="text-sm text-gray-300 mb-3 line-clamp-2">
{project.description}
</p>

<div className="flex flex-wrap gap-2">

{project.tags.slice(0,3).map((tag:any)=>(
<span
key={tag}
className="text-[10px] px-2 py-1 rounded bg-white/10 backdrop-blur"
>
{tag}
</span>
))}

</div>

</div>

<div
className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-3xl"
style={{boxShadow:`0 0 80px ${project.color}40`}}
/>

</motion.div>

);
}

export function ProjectShowcase(){

const [selectedId,setSelectedId] = useState<number|null>(null);

const selectedProject = projects.find(p=>p.id===selectedId);

return(

<section
id="projects"
className="w-full py-24 px-6 lg:px-24 bg-background relative"
>

<div className="text-center mb-16">

<h2 className="text-4xl md:text-5xl font-bold mb-4">
Featured <span className="text-primary">Projects</span>
</h2>

<p className="text-gray-400 max-w-xl mx-auto">
Real projects showcasing branding, development, and system design.
</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center max-w-7xl mx-auto">

{projects.map(project=>(
<motion.div key={project.id} layoutId={`project-${project.id}`}>
<TiltCard
project={project}
onClick={()=>setSelectedId(project.id)}
/>
</motion.div>
))}

</div>

<AnimatePresence>

{selectedProject && (

<div className="fixed inset-0 z-50 flex items-center justify-center px-4">

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="absolute inset-0 bg-black/70 backdrop-blur"
onClick={()=>setSelectedId(null)}
/>

<motion.div
layoutId={`project-${selectedProject.id}`}
className="relative w-full max-w-5xl bg-background rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row overflow-hidden"
>

<button
onClick={()=>setSelectedId(null)}
className="absolute right-6 top-6 bg-black/40 p-2 rounded-full"
>
<X size={18}/>
</button>

<div className="lg:w-2/5 h-[300px] lg:h-auto relative">
<img
src={selectedProject.mockup}
className="absolute inset-0 w-full h-full object-cover"
/>
</div>

<div className="lg:w-3/5 p-8">

<h3
className="text-3xl font-bold mb-4"
style={{color:selectedProject.color}}
>
{selectedProject.title}
</h3>

<div className="flex gap-2 flex-wrap mb-6">

{selectedProject.tags.map(tag=>(
<span key={tag} className="text-xs px-2 py-1 bg-white/10 rounded">
{tag}
</span>
))}

</div>

<section className="mb-4">

<h4 className="font-bold flex items-center gap-2 mb-2">
<Zap size={18}/> The Problem
</h4>

<p className="text-gray-400 text-sm">
{selectedProject.problem}
</p>

</section>

<section className="mb-4">

<h4 className="font-bold flex items-center gap-2 mb-2">
<Layers size={18}/> Architecture
</h4>

<p className="text-gray-400 text-sm">
{selectedProject.architecture}
</p>

</section>

<section>

<h4 className="font-bold flex items-center gap-2 mb-2">
<Globe size={18}/> Key Highlights
</h4>

<ul className="space-y-2">

{selectedProject.metrics.map((m,i)=>(
<li key={i} className="flex gap-2 text-sm text-gray-300">
<Check size={14}/>
{m}
</li>
))}

</ul>

</section>

<div className="mt-6 flex gap-3 flex-wrap">

{selectedProject.link && (

<a
href={selectedProject.link}
target="_blank"
className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-semibold"
>
<ExternalLink size={16}/>
Visit Website
</a>

)}

</div>

</div>

</motion.div>

</div>

)}

</AnimatePresence>

</section>

);
}