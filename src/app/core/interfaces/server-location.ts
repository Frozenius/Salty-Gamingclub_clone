export interface ServerLocation {
  name: string;
  portRange: PortRange;
  location: Location;
  locationImage: string;
}

interface PortRange {
  min: number;
  max: number;
}

interface Location {
  name: string;
  locationImage: string;
}
