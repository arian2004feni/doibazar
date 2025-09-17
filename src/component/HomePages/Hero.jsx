import React from 'react';

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen pb-12">
      <div className="hero-content flex-col lg:flex-row-reverse gap-20">
        <img
          src="/hero.png"
          className="sm:max-w-lg rounded-lg drop-shadow-lg"
        />
        <div>
          <h1 className="text-3xl min-[450px]:text-4xl sm:text-5xl font-bold bangla">মিষ্টির আনন্দ মিস করবেন না। <br /> দই, মিষ্টি ও কেক এখন এক ক্লিকে হাতে!</h1>
          <p className="py-6 bangla">
            শুদ্ধ উপকরণে তৈরি টক দই, মিষ্টি দই, রসগোল্লা, সন্দেশ আর ফ্রেশ কেক–সব এক ক্লিকে। আর দোকানে ছুটোছুটি নয়! ফ্রেশ দেশি মিষ্টি ও দই অর্ডার করুন এখনই অনলাইনে। দ্রুত ডেলিভারিতে আপনার পরিবারে পৌঁছে যাবে মিষ্টি আনন্দ।
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;