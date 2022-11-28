export interface PtyServer {
  object: string;
  datum: Data[];
  meta: Meta;
}

export interface SftpDetails {
  ip: string;
  port: number;
}

export interface Limits {
  memory: number;
  swap: number;
  disk: number;
  io: number;
  cpu: number;
}

export interface FeatureLimits {
  databases: number;
  allocations: number;
  backups: number;
}

export interface Attributes2 {
  id: number;
  ip: string;
  ip_alias?: unknown;
  port: number;
  notes: string;
  is_default: boolean;
}

export interface Data2 {
  object: string;
  attributes: Attributes2;
}

export interface Data {
  object: string;
  attributes: Attributes;
}

export interface Allocations {
  object: string;
  data: Data2[];
}

export interface Relationships {
  allocations: Allocations;
}

export interface Attributes {
  server_owner: boolean;
  identifier: string;
  uuid: string;
  name: string;
  node: string;
  sftp_details: SftpDetails;
  description: string;
  limits: Limits;
  feature_limits: FeatureLimits;
  is_suspended: boolean;
  is_installing: boolean;
  relationships: Relationships;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: unknown;
}

export interface Meta {
  pagination: Pagination;
}
