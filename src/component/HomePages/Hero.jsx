import React from "react";

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen pb-12">
      <div className="hero-content flex-col md:flex-row-reverse gap-20 md:gap-8 lg:gap-20 bangla">
        <img
          src="/hero.png"
          className="max-sm:hidden sm:max-w-lg md:max-w-[46vw] lg:max-w-lg rounded-lg drop-shadow-lg drop-shadow-black/40"
        />
        <div>
          <h1 className="text-3xl min-[450px]:text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold">দই, মিষ্টি ও কেক এখন এক ক্লিকে!
          </h1>
          <p className="py-6">
            শুদ্ধ উপকরণে তৈরি টক দই, মিষ্টি দই, রসগোল্লা, সন্দেশ আর ফ্রেশ কেক–সব
            এক ক্লিকে। আর দোকানে ছুটোছুটি নয়! ফ্রেশ দেশি মিষ্টি ও দই অর্ডার করুন
            এখনই অনলাইনে। দ্রুত ডেলিভারিতে আপনার পরিবারে পৌঁছে যাবে মিষ্টি
            আনন্দ।
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
