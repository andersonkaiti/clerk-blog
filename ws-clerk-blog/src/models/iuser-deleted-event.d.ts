export interface IUserDeletedEvent {
  data: IUser;
  event_attributes: IEventAttributes;
  object: string;
  timestamp: number;
  type: "user.deleted";
}

export interface IUser {
  deleted: boolean;
  id: string;
  object: string;
}

export interface IEventAttributes {
  http_request: IHTTPRequest;
}

export interface IHTTPRequest {
  client_ip: string;
  user_agent: string;
}
