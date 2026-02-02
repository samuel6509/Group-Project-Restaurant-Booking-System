<?php
//made by lj330

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class RecentOrdersController extends Controller
{
    // Function to get recent orders for a specific user
    public function getRecentOrders(Request $request)
    {
        // Get user ID from the request input
        $userID = $request->input('userID');

        // Check if userID is provided in the request
        if (!$userID) {
            return response()->json(['success' => false, 'message' => 'User ID is required.'], 400);
        }

        // Check if the user exists in the database
        if (!\App\Models\User::where('id', $userID)->exists()) {
            return response()->json(['success' => false, 'message' => 'User not found.'], 404);
        }

        // Fetch the user's orders along with order items and include address, city, and postcode
        $orders = Order::with(['orderItems' => function ($query) {
            // Select relevant columns for order items
            $query->select('order_id', 'item_name', 'quantity', 'price', 'item_description', 'menu_type');
        }])
            // Filter orders by user ID and order them by creation date in descending order
            ->where('user_id', $userID)
            ->orderBy('created_at', 'desc')
            // Retrieve the necessary order details (ID, address, city, postcode, total price, status, and created date)
            ->get(['id', 'user_id', 'address', 'city', 'postcode', 'total_price', 'status', 'created_at']);

        // Return a success response with the retrieved orders data
        return response()->json(['success' => true, 'data' => $orders]);
    }
}
