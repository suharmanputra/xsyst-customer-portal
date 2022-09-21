export interface PrivacyPolicyList {
  since_date: Date;
  privacy_policy_string: string;
}

export interface Data {
  privacy_policy_list: PrivacyPolicyList[];
}

export interface privacypolicyresp {
  status: string;
  message: string;
  data: Data;
}
