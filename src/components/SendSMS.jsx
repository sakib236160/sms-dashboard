// src/pages/SendSMS.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSMS } from "../redux/slices/smsSlice";
import { toast } from "react-toastify";

export default function SendSMS() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.sms);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !message) {
      toast.error("ফোন নম্বর এবং মেসেজ দিন");
      return;
    }

    const resultAction = await dispatch(sendSMS({ phone, message }));

    if (sendSMS.fulfilled.match(resultAction)) {
      toast.success("SMS পাঠানো হয়েছে!");
      setPhone("");
      setMessage("");
    } else {
      toast.error("SMS পাঠাতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📨 Send SMS</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="01XXXXXXXXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={160}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>
      </form>
    </div>
  );
}
