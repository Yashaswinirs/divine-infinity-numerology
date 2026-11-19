export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}

// TODO(api): Replace with real backend submission endpoint when available.
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse> {
  // Simulate network roundtrip
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!payload.name?.trim() || !payload.email?.trim() || !payload.phone?.trim()) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  return {
    success: true,
    message: "Thank you! Your enquiry has been received. Our team will get back to you shortly.",
  };
}
