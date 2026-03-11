import { useState, useEffect, useRef } from "react";
import {
motion,
AnimatePresence,
useMotionValue,
useSpring,
useTransform,
useScroll
} from "framer-motion";

import { Calendar, Clock, User, X } from "lucide-react";

interface Blog {
id:number
title:string
description:string
category:string
color:string
author:string
date:string
read:string
image:string
content:string[]
}

const blogs:Blog[]=[

{
id:1,
title:"Firebase vs Supabase: Which Backend Should You Choose?",
description:"A deep comparison between Firebase and Supabase.",
category:"BACKEND",
color:"#f97316",
author:"Abhishek Kushwaha",
date:"Mar 5, 2026",
read:"7 min read",
image:"https://images.unsplash.com/photo-1555949963-aa79dcee981c",
content:[
"Backend-as-a-Service platforms help developers build applications faster.",
"Firebase is Google's backend platform offering authentication, Firestore, hosting and storage.",
"Supabase is an open-source alternative built on PostgreSQL.",
"Firebase uses NoSQL databases while Supabase uses relational SQL.",
"Supabase offers more control and avoids vendor lock-in.",
"Firebase provides tight integration with Google Cloud infrastructure.",
"Choosing depends on whether you prefer flexibility or ecosystem."
]
},

{
id:2,
title:"Vite vs React: Understanding the Difference",
description:"Why modern developers prefer Vite.",
category:"FRONTEND",
color:"#6366f1",
author:"Abhishek Kushwaha",
date:"Feb 28, 2026",
read:"6 min read",
image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085",
content:[
"React is a library for building user interfaces.",
"Vite is a development server and build tool.",
"Vite improves development speed using native ES modules.",
"It provides instant hot module replacement.",
"React combined with Vite creates an extremely fast workflow."
]
},

{
id:3,
title:"Vercel vs GitHub: Deployment vs Version Control",
description:"Understanding modern deployment workflows.",
category:"DEVOPS",
color:"#10b981",
author:"Abhishek Kushwaha",
date:"Feb 15, 2026",
read:"5 min read",
image:"https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1200&auto=format&fit=crop",
content:[
"GitHub is used for version control and collaboration.",
"Developers manage commits, branches and pull requests.",
"Vercel is a platform used to deploy web applications.",
"When code is pushed to GitHub, Vercel automatically deploys it.",
"This workflow creates continuous deployment pipelines."
]
},

{
id:4,
title:"Artificial Intelligence vs Machine Learning",
description:"Understanding the difference between AI and ML.",
category:"AI",
color:"#ec4899",
author:"Abhishek Kushwaha",
date:"Feb 10, 2026",
read:"6 min read",
image:"https://images.unsplash.com/photo-1677442136019-21780ecad995",
content:[
"Artificial Intelligence refers to machines performing intelligent tasks.",
"Machine Learning is a subset of AI that learns patterns from data.",
"ML algorithms learn automatically from large datasets.",
"AI technologies power recommendation systems and automation."
]
}

]

function GlassBlogCard({blog,onClick}:{blog:Blog,onClick:()=>void}){

const ref=useRef<HTMLDivElement>(null)

const x=useMotionValue(0)
const y=useMotionValue(0)

const mouseX=useSpring(x)
const mouseY=useSpring(y)

const rotateX=useTransform(mouseY,[-0.5,0.5],["10deg","-10deg"])
const rotateY=useTransform(mouseX,[-0.5,0.5],["-10deg","10deg"])

function handleMouseMove(e:any){

if(!ref.current)return

const rect=ref.current.getBoundingClientRect()

const width=rect.width
const height=rect.height

const mouseXPos=e.clientX-rect.left
const mouseYPos=e.clientY-rect.top

x.set(mouseXPos/width-0.5)
y.set(mouseYPos/height-0.5)

}

function handleMouseLeave(){
x.set(0)
y.set(0)
}

return(

<motion.div
ref={ref}
onMouseMove={handleMouseMove}
onMouseLeave={handleMouseLeave}
onClick={onClick}
style={{rotateX,rotateY,transformStyle:"preserve-3d"}}
className="relative w-full max-w-[360px] rounded-3xl overflow-hidden cursor-pointer group"
>

<div
className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"
style={{boxShadow:`0 0 80px ${blog.color}40`}}
/>

<div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

<div className="relative overflow-hidden">

<img
src={blog.image}
className="h-[220px] w-full object-cover group-hover:scale-110 transition duration-700"
/>

<span
style={{background:blog.color}}
className="absolute top-4 left-4 text-xs px-3 py-1 rounded text-black font-semibold"
>
{blog.category}
</span>

</div>

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

)

}

export function BlogSection(){

const [selected,setSelected]=useState<Blog|null>(null)

const articleRef=useRef<HTMLDivElement>(null)

const {scrollYProgress}=useScroll({
container:articleRef
})

const progress=useSpring(scrollYProgress,{
stiffness:120,
damping:20
})

useEffect(()=>{

if(selected){
document.body.style.overflow="hidden"
document.documentElement.style.overflow="hidden"
}else{
document.body.style.overflow="auto"
document.documentElement.style.overflow="auto"
}

return ()=>{
document.body.style.overflow="auto"
document.documentElement.style.overflow="auto"
}

},[selected])

return(

<section className="py-24 px-6 lg:px-24">

<div className="text-center mb-16">

<h2 className="text-4xl font-bold">
Latest <span className="text-primary">Blogs</span>
</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">

{blogs.map(blog=>(
<GlassBlogCard
key={blog.id}
blog={blog}
onClick={()=>setSelected(blog)}
/>
))}

</div>

<AnimatePresence>

{selected &&(

<div className="fixed inset-0 z-50 flex items-center justify-center px-4">

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="absolute inset-0 bg-black/80 backdrop-blur"
onClick={()=>setSelected(null)}
/>

<motion.div
layoutId={`blog-${selected.id}`}
onWheel={(e)=>e.stopPropagation()}
className="relative w-full max-w-3xl bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col"
>

<motion.div
style={{scaleX:progress}}
className="fixed top-0 left-0 right-0 h-[3px] bg-yellow-400 origin-left z-50"
/>

<button
onClick={()=>setSelected(null)}
className="absolute right-4 top-4 bg-white/10 p-2 rounded-full z-20"
>
<X size={18}/>
</button>

<div className="relative">

<img
src={selected.image}
className="w-full h-[240px] object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"/>

<span
style={{background:selected.color}}
className="absolute top-4 left-4 text-xs px-3 py-1 rounded text-black font-semibold"
>
{selected.category}
</span>

<h2 className="absolute bottom-6 left-6 right-6 text-2xl font-bold">
{selected.title}
</h2>

</div>

<div className="sticky top-0 bg-black border-b border-white/10 px-6 py-3 flex gap-6 text-sm text-gray-400">

<span className="flex items-center gap-2">
<User size={16}/>
{selected.author}
</span>

<span className="flex items-center gap-2">
<Calendar size={16}/>
{selected.date}
</span>

<span className="flex items-center gap-2">
<Clock size={16}/>
{selected.read}
</span>

</div>

<div
ref={articleRef}
className="px-6 py-6 h-[60vh] overflow-y-auto overscroll-contain space-y-5 text-gray-300 leading-relaxed"
>

{selected.content.map((p,i)=>(
<p key={i}>{p}</p>
))}

</div>

</motion.div>

</div>

)}

</AnimatePresence>

</section>

)

}