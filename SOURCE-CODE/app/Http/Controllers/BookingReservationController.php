<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Shell;
use Illuminate\Support\Facades\Session;

class BookingReservationController extends Controller{

    #Generates a unique reference code
    private function generateReferenceCode()
    {
        do {
            $code = strtoupper(uniqid('RES-'));
        } while (Reservations::where('referenceCode', $code)->exists());

        return $code;
    }

    public function store(Request $request) {

        //Log the incoming request data
        Log::info('Booking Data:', $request->all());

        //validates the data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'reservationDate' => 'required|date|after_or_equal:today',
            'reservationTime' => 'required|date_format:H:i',
            'numGuests' => 'required|integer|min:1|max:20',
            'specialRequest' => 'nullable|string',
            'phoneNumber' => 'required|digits:11',
            'email' => 'required|email|max:255',

        ]);

        //Generate the reference code
        $referenceCode = $this->generateReferenceCode();

        //Creates the booking
        $reservation = Reservations::create([
            'name' => $validatedData['name'],
            'reservationDate' => $validatedData['reservationDate'],
            'reservationTime' => $validatedData['reservationTime'],
            'numGuests' => $validatedData['numGuests'],
            'specialRequests' => $validatedData['specialRequest'] ?? null,
            'phoneNumber' => $validatedData['phoneNumber'],
            'email' => $validatedData['email'],
            'referenceCode' => $referenceCode,
        ]);

        //Send the confirmation email to the user
        $this->sendReservationEmail($reservation);

        //Store data in session to persist across redirect
        Session::flash('reservation', [
            'name' => $reservation->name,
            'email' => $reservation->email,
            'referenceCode' => $reservation->referenceCode,
            'reservationDate' => $reservation->reservationDate,
            'reservationTime' => $reservation->reservationTime,
            'numGuests' => $reservation->numGuests,
        ]);

        return redirect()->route('booking-success');
    }

    private function sendReservationEmail($reservation)
    {
        Log::info('Triggered sendReservationEmail method.', ['reservation' => $reservation->toArray()]);
        
        //Prepare email data
        $emailData = [
            'name' => $reservation->name,
            'email' => $reservation->email,
            'referenceCode' => $reservation->referenceCode,
            'reservationDate' => $reservation->reservationDate,
            'reservationTime' => $reservation->reservationTime,
        ];

        Log::info('Email data prepared:', $emailData);

        //Path to the SendMail.js script (Change Path depening on your device)
        $scriptPath = '"C:\\Users\\milos\\OneDrive\\Documents\\COMP6000 Project\\comp6000-2024-pg13\\RestaurantBookingSystem\\resources\\js\\Node\\SendMail.js"';

        //Call the Node.js script using PHP's shell_exec
        $command = "\"C:/Program Files/nodejs/node.exe\" $scriptPath '{$emailData['email']}' '{$emailData['name']}' '{$emailData['referenceCode']}' '{$emailData['reservationDate']}' '{$emailData['reservationTime']}'";

        Log::info('Executed email command:', ['command' => $command]);

        $output = shell_exec($command);
        
        Log::info('Shell command output:', ['output' => $output]);

    }
}