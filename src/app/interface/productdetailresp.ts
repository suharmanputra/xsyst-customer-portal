export interface Attachment {
  unique_name_id: string;
}

export interface CounterHistory {
  id_counter_collections: number;
  collection_date: string;
  mono_copy: string;
  mono_print: string;
  mono_large_copy: string;
  mono_large_print: string;
  color_copy: string;
  color_print: string;
  color_large_copy: string;
  color_large_print: string;
  attachments: Attachment[];
}

export interface ServiceHistory {
  id_service_order: number;
  svo_type: string;
  svo_no: string;
  req_date: string;
}

export interface DeviceDeliveryHistory {
  id_moving: number;
  delivery_type: string;
  doc_no: string;
  doc_date: string;
}

export interface AdditionalItemHistory {
  id_svo: number;
  svo_no: string;
  req_date: Date;
  desc: string;
}

export interface Data {
  counter_history: CounterHistory[];
  service_history: ServiceHistory[];
  device_delivery_history: DeviceDeliveryHistory[];
  additional_item_history: AdditionalItemHistory[];
}

export interface Productdetailresp {
  status: string;
  message: string;
  data: Data;
}
