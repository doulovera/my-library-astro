export interface SearchDocResponse {
  key:                    string;
  type:                   string;
  seed:                   string[];
  title:                  string;
  title_suggest:          string;
  title_sort:             string;
  edition_count:          number;
  edition_key:            string[];
  publish_date:           string[];
  publish_year:           number[];
  first_publish_year:     number;
  number_of_pages_median: number;
  isbn:                   string[];
  last_modified_i:        number;
  ebook_count_i:          number;
  ebook_access:           string;
  has_fulltext:           boolean;
  public_scan_b:          boolean;
  publisher:              string[];
  language:               string[];
  author_key:             string[];
  author_name:            string[];
  id_librarything:        string[];
  publisher_facet:        string[];
  _version_:              number;
  author_facet:           string[];
}

export interface SearchResponse {
  numFound:      number;
  start:         number;
  numFoundExact: boolean;
  docs:          SearchDocResponse[];
  num_found:     number;
  q:             string;
  offset:        null;
}

export interface BookListInfo {
  id:          string;
  title:       string;
  publishDate: string;
  isbn:        string[];
  publisher:   string[];
  language:    string[];
  author:      string;
  cover:       string;
}
