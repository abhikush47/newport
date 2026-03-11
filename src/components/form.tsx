import { Mail, Phone, Instagram, MapPin, MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function Form() {

const formRef = useRef<HTMLFormElement>(null);

const [success,setSuccess] = useState(false);
const [loading,setLoading] = useState(false);
const [services,setServices] = useState<string[]>([]);

const toggleService = (service:string) => {
setServices(prev =>
prev.includes(service)
? prev.filter(s => s !== service)
: [...prev,service]
);
};

const fireConfetti = () => {
confetti({
particleCount:120,
spread:70,
origin:{y:0.6}
});
};

const sendEmail = (e:any) => {

e.preventDefault();

if(!formRef.current) return;

setLoading(true);

emailjs.sendForm(
"service_bssmnva",
"template_n0512bk",
formRef.current,
"VhKMYH0KsXu1C5hY8"
)

.then(() => {

setSuccess(true);
setLoading(false);

formRef.current?.reset();
setServices([]);

fireConfetti();

})

.catch(() => {

setLoading(false);
alert("Something went wrong");

});

};

return (

<section className="w-full py-28 px-6 lg:px-24 bg-[#0f2a4a]">

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

{/* LEFT INFO */}

<div>

<h2 className="text-4xl font-bold mb-4 text-white">
WORK WITH <span className="text-yellow-400">ME</span>
</h2>

<p className="text-gray-300 mb-10">
Tell me about your project or collaboration idea.
</p>

<div className="space-y-8">

{/* EMAIL */}

<div className="flex gap-4">
<Mail className="text-yellow-400"/>
<div>
<p className="text-sm text-gray-300">EMAIL</p>
<p className="text-white">abhi.kush047@gmaiil.com</p>
</div>
</div>

{/* PHONE */}

<div className="flex gap-4">
<Phone className="text-yellow-400"/>
<div>
<p className="text-sm text-gray-300">PHONE / WHATSAPP</p>
<p className="text-white">+977 9749939797</p>
</div>
</div>

{/* INSTAGRAM */}

<div className="flex gap-4">
<Instagram className="text-yellow-400"/>
<div>
<p className="text-sm text-gray-300">INSTAGRAM</p>
<p className="text-white">@abhi__kush47</p>
</div>
</div>

{/* LOCATION */}

<div className="flex gap-4">
<MapPin className="text-yellow-400"/>
<div>
<p className="text-sm text-gray-300">LOCATION</p>
<p className="text-white">Bhubaneswar, India</p>
</div>
</div>

{/* WHATSAPP CARD */}

<a
href="https://wa.me/9779749939797"
target="_blank"
className="flex items-center gap-4 border border-green-500/40 p-5 rounded-xl hover:bg-green-500/10 transition w-full"
>

<MessageCircle className="text-green-400" size={28}/>

<div>
<p className="text-white font-semibold">
Chat on WhatsApp
</p>

<p className="text-sm text-gray-400">
Quick response guaranteed
</p>
</div>

</a>

</div>

</div>

{/* RIGHT FORM */}

<div className="bg-[#0b1e34] border border-yellow-400/20 p-10 shadow-xl">

<h3 className="text-xl font-bold mb-2 text-white">
PROJECT APPLICATION
</h3>

<p className="text-gray-400 mb-8">
Fill out the form and I'll get back to you soon.
</p>

<form ref={formRef} onSubmit={sendEmail} className="space-y-6">

<input
type="hidden"
name="services"
value={services.join(", ")}
/>

<div className="grid md:grid-cols-2 gap-4">

<input
name="name"
placeholder="Your full name"
required
className="bg-[#091728] border border-white/10 px-4 py-3 text-white focus:border-yellow-400 outline-none"
/>

<input
name="email"
placeholder="your@email.com"
required
className="bg-[#091728] border border-white/10 px-4 py-3 text-white focus:border-yellow-400 outline-none"
/>

</div>

<input
name="phone"
placeholder="+91 XXXXX XXXXX"
className="w-full bg-[#091728] border border-white/10 px-4 py-3 text-white"
/>

<select
name="project_type"
className="w-full bg-[#091728] border border-white/10 px-4 py-3 text-white"
>

<option>Select project type</option>
<option>Website Development</option>
<option>Mobile App Development</option>
<option>UI/UX Design</option>
<option>Branding</option>
<option>Freelancing</option>
<option>AI Automation</option>

</select>

<select
name="budget"
className="w-full bg-[#091728] border border-white/10 px-4 py-3 text-white"
>

<option>Select your budget</option>
<option>Below $200</option>
<option>$200-$500</option>
<option>$500-$1000</option>
<option>$1000+</option>

</select>

<select
name="timeline"
className="w-full bg-[#091728] border border-white/10 px-4 py-3 text-white"
>

<option>When do you want the project completed?</option>
<option>ASAP</option>
<option>1-2 weeks</option>
<option>1 month</option>
<option>Flexible</option>

</select>

<textarea
name="message"
rows={4}
placeholder="Tell me about your project..."
className="w-full bg-[#091728] border border-white/10 px-4 py-3 text-white"
/>

{/* SERVICES */}

<div>

<p className="text-xs text-gray-400 mb-3">
SERVICES NEEDED
</p>

<div className="grid grid-cols-2 gap-3 text-sm text-gray-300">

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("Website Development")}/>
Website Development
</label>

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("Mobile App Development")}/>
Mobile App Development
</label>

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("UI/UX Design")}/>
UI/UX Design
</label>

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("Branding & Graphic Design")}/>
Branding & Graphic Design
</label>

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("AI / Automation")}/>
AI / Automation
</label>

<label className="flex items-center gap-2">
<input type="checkbox" onChange={()=>toggleService("Consultation")}/>
Consultation
</label>

</div>

</div>

<button
type="submit"
disabled={loading}
className="w-full bg-yellow-400 text-black font-semibold py-4 hover:bg-yellow-300 transition"
>

{loading ? "Sending..." : "START A PROJECT"}

</button>

</form>

</div>

</div>

{/* SUCCESS MODAL */}

{success && (

<motion.div
initial={{opacity:0,scale:0.8}}
animate={{opacity:1,scale:1}}
className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
>

<div className="bg-[#0b1e34] p-10 border border-yellow-400 text-center">

<h2 className="text-2xl text-white mb-4">
🎉 Request Sent!
</h2>

<p className="text-gray-300 mb-6">
Thanks for reaching out. I'll reply soon.
</p>

<button
onClick={()=>setSuccess(false)}
className="bg-yellow-400 text-black px-6 py-3"
>

Close

</button>

</div>

</motion.div>

)}

</section>

);

}