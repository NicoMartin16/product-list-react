export interface Product {
    image:    Image;
    name:     string;
    category: string;
    price:    number;
    quantity?: number;
}

export interface Image {
    thumbnail: string;
    mobile:    string;
    tablet:    string;
    desktop:   string;
}
