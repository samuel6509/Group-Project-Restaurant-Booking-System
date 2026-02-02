import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Register() {
    useEffect(() => {
        alert('Registration for Admin Accounts is disabled. Please contact the admin to request a staff login.');
        router.visit(route('login'));
    }, []);

    return (
        <>
            <Head title="Redirecting..." />
            <p className="p-4 text-center text-gray-600">Redirecting to login...</p>
        </>
    );
}
