<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
   
    public function index()
{
    $faqs = Faq::orderBy('order', 'asc')->paginate(10); 
    return inertia('Admin/ManageFaqs', ['faqs' => $faqs]);
}


    public function create()
    {
        return inertia('Admin/CreateFaq');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'question' => 'required|string|max:255',
        'answer' => 'required|string',
    ]);

    $lastOrder = Faq::max('order') ?? 0;

    Faq::create(array_merge($validated, ['order' => $lastOrder + 1]));

    return redirect()->route('admin.faqs.index')->with('success', 'FAQ created successfully.');
}


    public function edit(Faq $faq)
    {
        return inertia('Admin/EditFaq', ['faq' => $faq]);
    }

    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq->update($validated);

        return redirect()->back()->with('success', 'FAQ updated successfully.');
    }

    public function updateOrder(Request $request)
{
    $validated = $request->validate([
        'faqs' => 'required|array',
        'faqs.*.id' => 'required|exists:faqs,id',
        'faqs.*.order' => 'required|integer',
    ]);

    foreach ($validated['faqs'] as $faqData) {
        Faq::where('id', $faqData['id'])->update(['order' => $faqData['order']]);
    }

      return redirect()->route('admin.faqs.index')->with('success', 'FAQs reordered successfully.');
}


    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ deleted successfully.');
    }
}
