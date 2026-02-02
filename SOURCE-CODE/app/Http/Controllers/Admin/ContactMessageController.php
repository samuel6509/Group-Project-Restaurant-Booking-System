<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
   
    public function store(Request $request)
{
    // Validate the input
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:20',
        'topic' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    // Ensure the phone number starts with +44
    $phone = $request->phone;
    if ($phone && !str_starts_with($phone, '+44')) {
        $phone = '+44' . ltrim($phone, '0'); 
    }


    ContactMessage::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $phone,
        'topic' => $request->topic,
        'message' => $request->message,
    ]);

    return redirect()->back()->with('success', 'Your message has been sent successfully.');
}


   

    public function index(Request $request)
{
    $query = ContactMessage::query();

    

       if ($request->has('status') && $request->status !== '' ) {
        $query->where('status', $request->status === 'read' ? 1 : 0);
        }

        if ($request->has('topic') && $request->topic !== '') {
        $query->where('topic', $request->topic);
}



      if ($request->has('keyword') && $request->keyword !== '') {
        $query->where(function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->keyword . '%')
              ->orWhere('email', 'like', '%' . $request->keyword . '%')
              ->orWhere('message', 'like', '%' . $request->keyword . '%')
              ->orWhere('phone', 'like', '%' . $request->keyword . '%');
        });
    }
  if ($request->has('start_date') && $request->start_date !== '') {
        $query->whereDate('created_at', '>=', $request->start_date);
    }

    if ($request->has('end_date') && $request->end_date !== '') {
        $query->whereDate('created_at', '<=', $request->end_date);
    }
     if ($request->has('specific_date') && $request->specific_date !== '') {
        $query->whereDate('created_at', '=', $request->specific_date);
    }
    $messages = $query->latest()->paginate(10);

    return inertia('Admin/Messages', [
        'messages' => $messages,
        'filters' => $request->only('status'),
    ]);
}


  
    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return redirect()->route('admin.messages')->with('success', 'Message deleted successfully.');
    }

    // Admin: Mark as read
    public function markAsRead($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update(['status' => 1]);

        return redirect()->route('admin.messages')->with('success', 'Message marked as read.');
    }
}
