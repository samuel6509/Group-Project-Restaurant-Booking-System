<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Inventory;

class InventoryController extends Controller
{
    // Fetch all inventory items
    public function inventoryPage(Request $request)
    {
        $search = $request->input('search');

        $query = Inventory::query()->latest();

        if ($search) {
            $query->where('item_name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        }

        $inventoryItems = $query->paginate(10);

        // Log the fetched inventory items
        Log::info('Fetched Inventory Items:', ['data' => $inventoryItems]);

        return Inertia::render('Admin/Inventory', [
            'inventoryItems' => $inventoryItems
        ]);
    }

    // Create a new inventory item
    public function store(Request $request)
    {
        $request->validate([
            'item_name' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'category' => 'nullable',
            'image_url' => 'nullable',
        ]);

        Inventory::create($request->all());

        return redirect()->route('admin.inventory')->with('success', 'Item added successfully.');
    }

    // Show edit form for an inventory item
    public function edit($id)
    {
        $item = Inventory::findOrFail($id);

        return Inertia::render('Admin/InventoryEdit', [
            'item' => $item
        ]);
    }

    // Update an inventory item
    public function update(Request $request, $id)
    {
        $request->validate([
            'item_name' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'category' => 'nullable',
            'image_url' => 'nullable',
        ]);

        $item = Inventory::findOrFail($id);
        $item->update($request->all());

        return redirect()->route('admin.inventory')->with('success', 'Item updated successfully.');
    }

    // Delete an item from Inventory
    public function destroy($id)
    {
        Inventory::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Item deleted successfully.');
    }

    // Fetch all inventory items (for API)
    public function fetchInventory()
    {
        $inventoryItems = Inventory::all();
        
        // Log the fetched inventory items for debugging
        Log::info('Fetched Inventory Items:', ['data' => $inventoryItems->toArray()]);

        return response()->json([
            'inventoryItems' => $inventoryItems
        ]);
    }
}


