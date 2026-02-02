<?php
// Controller to be used by all menu tables
// the aim of this controller is to send the part of the menu chosen by the user

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Menu;
use Inertia\Inertia;

class MenuController extends Controller
{
    // method to check if the menu type is valid
    public function inArray($menuType)
    {
        if (!in_array($menuType, ['morning_menu', 'evening_menu', 'kids_menu'])) 
        {
            return response()->json(['error' => 'Invalid menu type'], 400);
        }
    }

    // method which gets the menu items dependent on the menu type
    public function getMenuItems(Request $request, $menuType)
    {
        $this->inArray($menuType);

        // defaults the item type to starter so something is already loaded on page
        $itemType = $request->get('itemType', 'starter');

        // new instance of the menu model to determine the target db table
        $menu = new Menu();
        $menu->setTableName($menuType);

        // gets items from target menu where the type matches the chosen type
        $items = $menu->where('itemType', $itemType)->get();

        return response()->json($items);
    }

    // same as above function but not subject to the item type filter
    public function menuItems($menuType = 'morning_menu')
    {
        $this->inArray($menuType);

        // new instance of the menu model to determine the target db table
        $menu = new Menu();
        $menu->setTableName($menuType);

        // gets the menu items & sorts them by item type
        $items = $menu->orderBy('itemType')->paginate(10);
        return Inertia::render('Admin/ManageMenu', ['menuItems' => $items, 'menuType' => $menuType]);
    }

    // function for deleting menu items
    public function delete($menuType, $item)
    {
        $this->inArray($menuType);
        
        $menu = new Menu();
        $menu->setTableName($menuType);

        // delete menu item with the corresponding ID
        $menu->where('itemID', $item)->delete();
        return redirect()->route('admin.manage-menu', ['menuType' => $menuType])->with('success', 'Menu item deleted successfully.');
    }

    // method to get the menu item onto the edit page
    public function edit($menuType, $item)
    {
        $this->inArray($menuType);

        $menu = new Menu();
        $menu->setTableName($menuType);

        $menuItem = $menu->where('itemID', $item)->first();

        return Inertia::render('Admin/EditMenuItem', ['menuItem' => $menuItem, 'menuType' => $menuType]);
    }

    // method to update a menu item
    public function update(Request $request, $menuType, $item)
    {
        $this->inArray($menuType);

        $validated = $request->validate
        ([
            'itemName' => 'required|string|max:255',
            'itemPrice' => 'required|numeric|min:0|max:99.99',
            'itemType' => 'required|in:starter,main,dessert,extra',
            'itemDescription' => 'required|string',
            'nutritional_info' => 'string',
        ]);

        $menu = new Menu();
        $menu->setTableName($menuType);

        // update the correct menu item with the updated data
        $menu->where('itemID', $item)->update($validated);

        return redirect()->route('admin.manage-menu', ['menuType' => $menuType])->with('success', 'Menu item updated successfully.');
    }

    // method that submits a new menu item 
    public function submitMenuItem(Request $request)
    {
        $validated = $request->validate
        ([
            'itemName' => 'required|string|max:255',
            'itemPrice' => 'required|numeric|min:0|max:99.99',
            'itemType' => 'required|in:starter,main,dessert,extra',
            'itemDescription' => 'required|string',
            'menuType' => 'required|in:morning_menu,evening_menu,kids_menu',
            'itemImageURL' => 'required|image|mimes:png|max:51200',
            'nutritional_info' => 'string',
        ]);

    // if there is an image
    if ($request->hasFile('itemImageURL')) 
    {
        $image = $request->file('itemImageURL');

        // stores the image in the correct directory
        $menuType = $validated['menuType'];
        $itemType = $validated['itemType'];
        $path = "menus/$menuType/$itemType";

        // store the image in the stored path
        $storedPath = $image->store($path, 'public');
        // the url to be passed to the db 
        $validated['itemImageURL'] = 'storage/' . $storedPath;
    }
        $menu = new Menu();
        $menu->setTableName($validated['menuType']);

        // create a new menu item with the validated data
        $menu->create($validated);

        return redirect()->route('admin.manage-menu', ['menuType' => $validated['menuType']])->with('success', 'Menu item added successfully.');
    }

    // method to get to the menu item creation page
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