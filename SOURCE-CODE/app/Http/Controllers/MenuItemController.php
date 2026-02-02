<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    // Method to check if the menu type is valid
    public function inArray($menuType)
    {
        if (!in_array($menuType, ['morning_menu', 'evening_menu', 'kids_menu'])) {
            return response()->json(['error' => 'Invalid menu type'], 400);
        }
    }

    // Method to get menu items based on the selected menu type
    public function getMenuItems(Request $request, $menuType)
    {
        $this->inArray($menuType);

        // Default item type to 'starter' if not provided
        $itemType = $request->get('type', 'starter');

        // New instance of the Menu model to set the correct table
        $menu = new Menu();
        $menu->setTableName($menuType);

        // Fetch menu items based on type
        $items = $menu->where('type', $itemType)->get();

        return response()->json($items);
    }

    // Get all menu items for a given menu type
    public function menuItems($menuType = 'morning_menu')
    {
        $this->inArray($menuType);

        $menu = new Menu();
        $menu->setTableName($menuType);

        // Retrieve and sort menu items
        $items = $menu->orderBy('type')->paginate(10);
        return Inertia::render('Admin/ManageMenu', ['menuItems' => $items, 'menuType' => $menuType]);
    }

    // Function for deleting menu items
    public function delete($menuType, $itemId)
    {
        $this->inArray($menuType);

        $menu = new Menu();
        $menu->setTableName($menuType);

        // Delete menu item with the corresponding ID
        $menu->where('id', $itemId)->delete();
        return redirect()->route('admin.manage-menu', ['menuType' => $menuType])->with('success', 'Menu item deleted successfully.');
    }

    // Method to get the menu item onto the edit page
    public function edit($menuType, $itemId)
    {
        $this->inArray($menuType);

        $menu = new Menu();
        $menu->setTableName($menuType);

        $menuItem = $menu->where('id', $itemId)->first();

        return Inertia::render('Admin/EditMenuItem', ['menuItem' => $menuItem, 'menuType' => $menuType]);
    }

    // Method to update a menu item
    public function update(Request $request, $menuType, $itemId)
    {
        $this->inArray($menuType);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0|max:99.99',
            'type' => 'required|in:starter,main,dessert,extra',
            'description' => 'required|string',
        ]);

        $menu = new Menu();
        $menu->setTableName($menuType);

        // Update the menu item
        $menu->where('id', $itemId)->update($validated);

        return redirect()->route('admin.manage-menu', ['menuType' => $menuType])->with('success', 'Menu item updated successfully.');
    }

    // Method to submit a new menu item
    public function submitMenuItem(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0|max:99.99',
            'type' => 'required|in:starter,main,dessert,extra',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'menuType' => 'required|in:morning_menu,evening_menu,kids_menu',
            'image_url' => 'required|image|mimes:png|max:51200',
        ]);

        // Handle image upload
        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');

            $menuType = $validated['menuType'];
            $itemType = $validated['type'];
            $path = "menus/$menuType/$itemType";

            $storedPath = $image->store($path, 'public');
            $validated['image_url'] = 'storage/' . $storedPath;
        }

        $menu = new Menu();
        $menu->setTableName($validated['menuType']);

        // Create a new menu item
        $menu->create($validated);

        return redirect()->route('admin.manage-menu', ['menuType' => $validated['menuType']])->with('success', 'Menu item added successfully.');
    }

    // Method to display the menu item creation page
    public function showCreatePage()
    {
        return Inertia::render('Admin/CreateMenuItem');
    }

    // Method to display a single menu item based on the selected menu type and item ID
    public function showMenuItem($menuType, $itemId)
    {
        // Validate menu type
         $this->inArray($menuType);

        $menu = new Menu();
        $menu->setTableName($menuType);

        // Fetch the selected menu item using its ID
        $menuItem = $menu->where('itemID', $itemId)->firstOrFail();

        // Return the menu item to the frontend (React or Blade)
        return Inertia::render('menuitem', ['menuItem' => $menuItem]);
    }
}
