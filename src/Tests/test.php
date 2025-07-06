<?php

require 'vendor/autoload.php';  // Ensure Composer autoloading is enabled

use Illuminate\Support\Collection;

class ProductCollection extends Collection
{
    public function totalPrice()
    {
        return $this->sum('price');
    }
}

$products = new ProductCollection([
    ['name' => 'Product A', 'price' => 100],
    ['name' => 'Product B', 'price' => 200],
]);

echo $products->totalPrice();  // Output: 300 // ['php', 'laravel', 'vue', 'js']

$json  = $products->toJson();
echo $json;

// Output: [{"name":"Product A","price":100},{"name":"Product B","price":200}]