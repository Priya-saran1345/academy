import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const OfferCard = () => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
const [discountCode, setdiscountCode] = useState<any>('Welcome20')
  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className=" max-w-md mx-auto relative">
      {/* Top Section with Image and Discount */}
      <div className="relative">
        <Image
          src="/images/discount.png" // Replace with your image path
          alt="Discount Offer"
          width={400}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div className="mt-4">
        <p className="text-lg text-black font-medium">
          Register now and Avail this Amazing Offer.
        </p>
     
        <div className="flex items-center gap-2 mt-4">
          <div
            ref={codeRef}
            className="border-dashed border-2 border-orange bg-orange/5 bg-orange-100 text-orange font-bold py-2 px-4 rounded-md"
          >
            {discountCode}
          </div>
          <button
            onClick={handleCopy}
            className="bg-orange/10 py-2 px-4 rounded-md text-orange font-medium flex items-center gap-1"
          >
            Copy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5h9a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 018.25 4.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 8.25v9a2.25 2.25 0 002.25 2.25h11.25"
              />
            </svg>
          </button>
        </div>
  
        {copied && (
          <div className="text-orange mt-2 text-sm">Code Copied!</div>
        )}
      </div>
     
    </div>
  );
};

export default OfferCard;
