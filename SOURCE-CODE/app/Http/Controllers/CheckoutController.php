<?php
//made by lj330
//log::info values are logged in storage/logs/laravel.log

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    // Function to handle order placement
    public function placeOrder(Request $request)
    {
        Log::info($request->all()); // Debugging: Check received data 

        try {
            $userId = $request->userID; // Get userId from request instead of hardcoding

            // Log received data for debugging in laraval.log
            Log::info('Received data in controller:', [
                'userID' => $userId, // Now using hardcoded userID
                'cartItems' => $request->cartItems,
                'address' => $request->address,
                'city' => $request->city,
                'postcode' => $request->postcode,
            ]);

            

            // 1. Retrieve the cart for user with hardcoded userID
            $cart = Cart::where('user_id', $userId)->first();

            Log::info('Retrieved cart from database:', $cart ? $cart->toArray() : []);
            
            //if cart not found return an error message
            if (!$cart) {
                return response()->json(['message' => 'Cart not found'], 400);
            }

            // 2. Retrieve the cart items
            $cartItems = CartItem::where('cart_id', $cart->id)->get();

            Log::info('Retrieved cart items from database:', $cartItems->toArray());

            // Return error if no items in cart
            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 400);
            }

            // 3. Simulate Payment (replace with real payment logic later)
            $paymentSuccess = true; // Hardcoded payment success for now
            if (!$paymentSuccess) {
                return response()->json(['message' => 'Payment failed'], 500);
            }

            // 4. Create the order and calculate total
            $totalPrice = $cartItems->sum(fn($item) => $item->price * $item->quantity);
            Log::info('Creating order:', [
                'user_id' => $userId,
                'total_price' => $totalPrice,
                'status' => 'completed'
            ]);

            // Create the order
            $order = Order::create([
                'user_id' => $userId, // Assign user ID to the order
                'total_price' => $totalPrice,  // Assign total price
                'status' => 'completed',   // Set order status as completed
                'address' => $request->address,     // Add address
                'city' => $request->city,           // Add city
                'postcode' => $request->postcode,   // Add postcode
            ]);

            // 5. Insert items into the order_items table
            foreach ($cartItems as $item) {
                Log::info('Creating order item:', [
                    'order_id' => $order->id,
                    'item_id' => $item->item_id, // Log item details for order
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ]);

                OrderItem::create([
                    'order_id' => $order->id,  // Associate with the order
                    'item_id' => $item->item_id,
                    'menu_type' => $item->menu_type,  // Store menu type (morning/evening/kids)
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'item_name' => $item->item_name,
                    'item_type' => $item->item_type,
                    'item_description' => $item->item_description,
                    'item_image_url' => $item->item_image_url ?? '',   // Handle possible null values for image URL
                ]);
            }

            // 6. Clear the user's cart after placing order
            CartItem::where('cart_id', $cart->id)->delete();

            // 7. Return success response
            return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);

        } catch (\Exception $e) {
            // Log any errors that occur during the order placement process
            Log::error('Order placement failed: ' . $e->getMessage());
            // Return generic error message in case of exception
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }
}