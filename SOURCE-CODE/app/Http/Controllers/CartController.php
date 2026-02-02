<?php 
//made by lj330

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;


class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'itemID' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'menuType' => 'required|string|in:morning_menu,evening_menu,kids_menu',
            'userID' => 'required|integer|exists:app_users,userID', // Update to use app_users and userID
        ]);

        // Extract parameters from the request
        $userID = $request->userID;
        $itemID = $request->itemID;
        $quantity = $request->quantity;
        $menuType = $request->menuType;

        // Allowed menu tables mapping for cleaner code
        $allowedMenus = [
            'morning_menu' => 'morning_menu',
            'evening_menu' => 'evening_menu',
            'kids_menu' => 'kids_menu',
        ];

        $tableName = $allowedMenus[$menuType]; // Map the menuType to corresponding table name

        // Find or create a cart for the user
        $cart = Cart::firstOrCreate(['user_id' => $userID]);

        // Fetch the item details from the appropriate menu table
        $itemDetails = DB::table($tableName)->where('itemID', $itemID)->first();

        // If the item doesn't exist in the menu, return an error response
        if (!$itemDetails) {
            return response()->json([
                'success' => false,
                'message' => "Item not found in the {$menuType} menu.",
            ], 404);
        }

        // Add or update the item in the cart
        $cartItem = CartItem::firstOrNew([
            'cart_id' => $cart->id,
            'item_id' => $itemID,
            'menu_type' => $menuType,
        ]);

        // Set the item's properties (quantity, price, etc.)
        $cartItem->quantity = $quantity; // Simply set the quantity to the new value
        $cartItem->price = $itemDetails->itemPrice;
        $cartItem->item_name = $itemDetails->itemName;
        $cartItem->item_type = $itemDetails->itemType;
        $cartItem->item_description = $itemDetails->itemDescription;
        $cartItem->item_image_url = $itemDetails->itemImageURL;

         // Save the cart item to the database
        $cartItem->save();

        // Return a success response with the added cart item details
        return response()->json([
            'success' => true,
            'message' => 'Item added to cart successfully.',
            'data' => [
                'cartItem' => $cartItem,
            ],
        ]);
    }

    //Method to retrieve the users cart alongside with its items
    public function getCart(Request $request)   {
        // Retrieve the cart for the user
        $cart = Cart::with(['items'])->where('user_id', $request->userID)->first();

        // If no cart is found, return an error response
        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        // Return the cart with its items
        return response()->json([
            'success' => true,
            'data' => $cart,
        ]);
    }

    //Function to remove an item from the cart (delete item from the cart_items database)
    public function removeCartItem(Request $request, $itemID) {
        
        $userID = $request->userID;

        // Get the user's cart
        $cart = Cart::where('user_id', $userID)->first();

        // If no cart is found, return an error response
        if (!$cart) {
            return response()->json(['success' => false, 'message' => 'Cart not found.'], 404);
        }

        // Find the cart item and delete it
        $deleted = CartItem::where('cart_id', $cart->id)->where('item_id', $itemID)->delete();

        // Return a success or failure message depending on whether the item was deleted
        if ($deleted) {
            return response()->json(['success' => true, 'message' => 'Item removed successfully.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Item not found in cart.'], 404);
        }
    }

    //This function handles updating the quantity in the cart 
    public function updateQuantity(Request $request)  {
        // Validate request
        $request->validate([
            'itemID' => 'required|integer',
            'quantity' => 'required|integer|min:1',
            'userID' => 'required|integer|exists:app_users,userID',
        ]);

        $userID = $request->userID;
        $itemID = $request->itemID;
        $newQuantity = $request->quantity;

        // Find the user's cart
        $cart = Cart::where('user_id', $userID)->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        // Find the cart item
        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('item_id', $itemID)
            ->first();

        // If the item is not found, return an error response
        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Item not found in cart.',
            ], 404);
        }

        // Update the quantity of the cart item
        $cartItem->quantity = $newQuantity;
        $cartItem->save();

        // Return a success response with the updated cart item
        return response()->json([
            'success' => true,
            'message' => 'Quantity updated successfully.',
            'data' => $cartItem
        ]);
    }


    //The function below is for the Your cart section on the checkout page
    public function getCartItemsForUser(Request $request) {
        $userID = $request->userID; 
    
        // Retrieve cart for the logged-in user
        $cart = Cart::where('user_id', $userID)->first();
    
        // If no cart is found, return an error response
        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }
    
        // Fetch cart items with quantity and calculate total price per item
        $cartItems = CartItem::where('cart_id', $cart->id)
            ->select(
                'item_id',  // Added this to send item ID for orders
                'item_name as name', 
                'price', 
                'quantity', 
                'item_description as description'
            )
            ->get()
            ->map(function ($item) {
                $item->total_price = $item->price * $item->quantity;  // Calculate total price
                return $item;
            });

        // Return the cart items with the total price
        return response()->json([
            'success' => true,
            'data' => $cartItems,
        ]);
    }
    
    




}
