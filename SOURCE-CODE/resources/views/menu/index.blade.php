@extends('layouts.app')

@section('content')
    <h1>Menu Items</h1>
    <div class="menu-items">
        @foreach($menuItems as $menuItem)
            <div class="menu-item">
                <img src="{{ asset($menuItem->itemImageURL) }}" alt="{{ $menuItem->itemName }}">
                <h2><a href="{{ route('menu_item.show', $menuItem->id) }}">{{ $menuItem->itemName }}</a></h2>
                <p>{{ $menuItem->itemDescription }}</p>
                <p>Price: £{{ number_format($menuItem->itemPrice, 2) }}</p>
            </div>
        @endforeach
    </div>
@endsection
