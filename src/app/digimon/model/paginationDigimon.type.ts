export interface paginationDigimon {
  content: Digimon[];
  pageable: Pageable;
}

export interface Digimon {
  id: number
  name: string
  href: string
  image: string
}

export interface Pageable {
  currentPage: number
  elementsOnPage: number
  totalElements: number
  totalPages: number
  previousPage: string
  nextPage: string
}
