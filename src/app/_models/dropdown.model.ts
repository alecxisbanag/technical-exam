export interface CpuDropdown {
  brand: Dropdown[];
  series: Dropdown[];
  model: Dropdown[];
}

export interface Dropdown {
  id: string;
  value: string;
  dependency: string;
}
