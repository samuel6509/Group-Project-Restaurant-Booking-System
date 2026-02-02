<<<<<<< HEAD

=======
>>>>>>> 7f5bf7df (admin step -1)
@extends('layouts.app')

@section('content')
    <h1>{{ $menuItem->itemName }}</h1>
<<<<<<< HEAD
    <img src="{{ asset($menuItem->itemImageURL) }}" width="300">
    <p>{{ $menuItem->itemDescription }}</p>
    <p><strong>Price:</strong> £{{ number_format($menuItem->itemPrice, 2) }}</p>
    <a href="{{ url('/menu') }}">Back to Menu</a>
=======
    <img src="{{ asset($menuItem->itemImageURL) }}" alt="{{ $menuItem->itemName }}">
    <p>{{ $menuItem->itemDescription }}</p>
    <p>Price: £{{ number_format($menuItem->itemPrice, 2) }}</p>

    <h2>Toppings</h2>
    <ul>
        @foreach($menuItem->toppings as $topping)
            <li>{{ $topping->toppingName }} (+£{{ number_format($topping->toppingPrice, 2) }})</li>
        @endforeach
    </ul>
>>>>>>> 7f5bf7df (admin step -1)
@endsection
