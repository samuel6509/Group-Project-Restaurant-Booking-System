<?php
 
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\BookingReservationController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SpecialMealsController;
use App\Http\Controllers\WhyPeopleChooseUsController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\ReviewsController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\AdminAuthController;
 
use App\Http\Controllers\CartController;
use App\Http\Controllers\SuperAdmin\PermissionController;
use App\Http\Controllers\SuperAdmin\UserPermissionController;
use App\Http\Controllers\SuperAdmin\RoleController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\RecentOrdersController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\TableSeatingController;
 
 
 
 
 
// make sure all url's are lower case & they can have a space in them
// for example the url /booking page       this is valid 
// this makes sure all our ur's work with out search bar
 
// Route to display all menu items
 
// Route for fetching special meals
Route::get('/api/special-meals', [SpecialMealsController::class, 'getSpecialMeals']);
// Route for fetching cuisines
Route::get('/api/cuisines', [WhyPeopleChooseUsController::class, 'getCuisines']);
 
//Route for the checkout page
Route::get('/getUserInfo', [LoginController::class, 'getUserInfoAll']);
 
//Route for getCartItemsForUser
Route::get('/get-cart-items', [CartController::class, 'getCartItemsForUser']);
 
 
//Route for place-order function
Route::post('/place-order', [CheckoutController::class, 'placeOrder']);
 
 
// route to the submite review page
Route::get('/submitReview', function () {
    return Inertia('SubmitReview');
});
// route to send review to db
Route::post('/post/submitReview', [ReviewController::class, 'SubmitReview']);
 
// register user page route
Route::get('/registerUser', function () {
    return inertia('RegisterPage');
});
// route the POST works over
Route::post('/post/registerUser', [RegisterController::class, 'store']);
 
// login page routes
Route::get('/loginUser', function () {
    return inertia('LoginPage');
});
// login the user
Route::post('/loginUser', [LoginController::class, 'login'])->name('loginUser');
// used to see if the user is logged in
Route::get('/loginUser', [LoginController::class, 'logInCheck']);
// logging out 
Route::post('/logoutUser', [LoginController::class, 'logout']);
 
// account routes
Route::get('/account', [LoginController::class, 'accountPage']);
Route::get('/account/info', [LoginController::class, 'getUserInfo']);
Route::put('/account/update', [LoginController::class, 'update']);
Route::get('/password', [LoginController::class, 'ChangePasswordPage']);
Route::put('/password/change', [LoginController::class, 'updatePassword']);
 
// home page route
Route::get('/home', function () {
    return inertia('HomePage');
});
 
//get like dish route 
Route::get('/likedDishes', function () { 
    return inertia('LikedDishes');
});
 
Route::get('/menuitem/{menuType}/{itemId}', [MenuController::class, 'showMenuItem']);
 
// route to get the reviews from the db
Route::get('/get/reviews', [ReviewController::class, 'pickReviews'])->name('home');
 
//Booking Reservation Page Route
Route::get('/booking', function () {
    //Renders the BookingReservationPage component using Inertia
    return inertia('BookingReservationPage');
});
//Handle the booking by using the store method
Route::post('/booking', [BookingReservationController::class, 'store']);

//Booking Success Page
Route::get('/booking-success', function () {
    //Renders the BookingSuccessPage component using Inertia
    return Inertia::render('BookingSuccessPage', [
        //Pass the reservation data to the page
        'reservation' => session('reservation')
    ]);
})->name('booking-success');
 
// About Page
Route::get('/about', function () {
    return inertia('about');
});
 
 
// recent orders Page
Route::get('/recentOrders', function () {
    return inertia('recentOrders');
});
 
// Route to fetch recent orders
Route::post('/orders', [RecentOrdersController::class, 'getRecentOrders']);
 
// cart Page
Route::get('/cart', function () {
    return inertia('cart');
});
 
// checkout page
Route::get('/checkout', function () {
    return Inertia::render('checkout'); 
});
 
//Route for addToCart function
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
 
//Route for fetching cart
Route::get('/cart/{userID}', [CartController::class, 'getCart']);
 
//Route for removing cart item
Route::delete('/cart/item/{itemID}', [CartController::class, 'removeCartItem']);
 
//Route for updating quantity in cart
Route::put('/cart/update-quantity', [CartController::class, 'updateQuantity']);
 
//Route for user-info funciton
Route::get('/user-info', [LoginController::class, 'getUserInfoAll']);
 
Route::get('/user-info-all', [LoginController::class, 'getUserInfoAll']);
 
// Contact Page
Route::get('/contact-us', function () {
    return inertia('contact-us');
});
 
Route::post('/contact-us', [ContactMessageController::class, 'store'])->name('contact-us.store');
 
 
// Faqs
Route::get('/faqs', function () {
    return inertia('faqs');
});
 
// Privacy
Route::get('/privacy-policy', function () {
    return inertia('privacy-policy');
});
 
Route::get('/menu/{menuType}', [MenuController::class, 'getMenuItems']);
 
// morning menu page
Route::get('/morningMenu', function () {
    return Inertia('MorningMenu');
});
 
// evening menu page
Route::get('/eveningMenu', function () {
    return Inertia('EveningMenu');
});
 
// kids menu page
Route::get('/kidsMenu', function () {
    return Inertia('KidsMenu');
});
 
 
 
 
 
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
 
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
 
Route::get("admin/login",[AdminAuthController::class, 'showLoginForm']);
Route::post("admin/login", [AdminAuthController::class, 'login']);
 
Route::middleware(['auth', 'role:Admin|SuperAdmin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
 
 
    //manage-faqs
    Route::middleware('permission:manage-faqs')->group(function () {
        Route::get('/faqs', [FaqController::class, 'index'])->name('admin.faqs.index');
        Route::get('/faqs/{faq}/edit', [FaqController::class, 'edit'])->name('admin.faqs.edit');
        Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('admin.faqs.update');
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('admin.faqs.destroy');
        Route::patch('/faqs/reorder', [FaqController::class, 'updateOrder'])->name('admin.faqs.reorder');
    });
 
    Route::middleware('permission:create-faqs')->group(function () {
        Route::get('/faqs/create', [FaqController::class, 'create'])->name('admin.faqs.create');
        Route::post('/faqs', [FaqController::class, 'store'])->name('admin.faqs.store');
    });
 
 
// manage inventory
Route::middleware('permission:manage-inventory')->group(function () {
    Route::post('/inventory', [InventoryController::class, 'store'])->name('admin.inventory.store');
    Route::get('/inventory', [InventoryController::class, 'inventoryPage'])->name('admin.inventory');
    Route::put('/inventory/{item}', [InventoryController::class, 'update'])->name('admin.inventory.update');
    Route::delete('/inventory/{item}', [InventoryController::class, 'destroy'])->name('admin.inventory.destroy');
});

 
    //show the table
    Route::get('/tables/{id}', [TableSeatingController::class, 'showTableSeating']);
 
    Route::middleware('permission:manage-reviews')->group(function () {
        Route::get('/manage-reviews', [ReviewsController::class, 'index'])->name('admin.reviews.index');
        Route::get('/manage-reviews/{review}/edit', [ReviewsController::class, 'edit'])->name('admin.reviews.edit');
        Route::put('/manage-reviews/{review}', [ReviewsController::class, 'update'])->name('admin.reviews.update');
        Route::delete('/manage-reviews/{review}', [ReviewsController::class, 'destroy'])->name('admin.reviews.destroy');
    });
    //manage-messages
    Route::middleware('permission:manage-contact-us-messages')->group(function () {
        Route::get('/messages', [ContactMessageController::class, 'index'])->name('admin.messages');
        Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy'])->name('admin.messages.destroy');
        Route::patch('/messages/{id}/mark-read', [ContactMessageController::class, 'markAsRead'])->name('admin.messages.mark-read');
    });
 
    Route::middleware('permission:manage-members')->group(function () {
        Route::get('/members', [MemberController::class, 'index'])->name('admin.members.index');
        Route::delete('/members/{user}', [MemberController::class, 'destroy'])->name('admin.members.destroy');
        Route::put('/members/{member}', [MemberController::class, 'update'])->name('admin.members.update');
    });
 
 
 
    // menu related routes
 
    Route::middleware('permission:manage-menu-items')->group(function () {
        Route::get('/manage-menu/{menuType?}', [MenuController::class, 'menuItems'])->name('admin.manage-menu');
        Route::delete('/manage-menu/{menuType}/{item}', [MenuController::class, 'delete'])->name('admin.manage-menu.delete');
        Route::get('/manage-menu/{menuType}/{item}/edit', [MenuController::class, 'edit'])->name('admin.manage-menu.edit');
        Route::put('/manage-menu/{menuType}/{item}', [MenuController::class, 'update'])->name('admin.manage-menu.update');
    });
 
    Route::middleware('permission:create-menu-items')->group(function () {
        Route::get('/menu/create/item', [MenuController::class, 'showCreatePage'])->name('admin.manage-menu.create');
        Route::post('/menu/create/item/post', [MenuController::class, 'submitMenuItem'])->name('admin.manage-menu.submit');
    });
});
 
Route::middleware(['auth', 'role:Super Admin'])->prefix('super-admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('super-admin.dashboard');
    Route::get('/manage-roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/manage-roles', [RoleController::class, 'store'])->name('roles.store');
    Route::put('/manage-roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/manage-roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
    Route::get('/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
    Route::get('/assign-permission', [UserPermissionController::class, 'index'])->name('home');
    Route::post('/assign-permission', [UserPermissionController::class, 'assignPermission'])->name('assign.permission');
    Route::post('/revoke-permission', [UserPermissionController::class, 'revokePermission'])->name('permissions.revoke');
});
 
 
 
 
require __DIR__ . '/auth.php';