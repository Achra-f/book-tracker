import { useState } from 'react';

export default function AuthForm({
    title = '',
    apiUrl,
    buttonText = 'Submit',
    onSuccess,
    extraFields = [],
    renderFooter,
    text,
}) {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: '',
            ...extraFields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
        }
    );

    const [error, setError] = useState(null);

    const onChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const confirmField = extraFields.find(f => f.name === 'confirmPassword');
        if (confirmField && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                onSuccess?.(data);
            } else {
                setError(data.error || `${title} failed`);
            }
        } catch (err) {
            setError('Network error');
            console.error(err);
        }
    };

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse lg:justify-between w-full gap-8">
                <div className="text-center sm:text-left max-w-md lg:w-1/2">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{text}</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    className="input input-bordered"
                                    value={formData.email}
                                    onChange={onChange}
                                    required
                                />

                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="input input-bordered"
                                    value={formData.password}
                                    onChange={onChange}
                                    required
                                />

                                {extraFields.map(({ name, label, type = 'text', placeholder }) => (
                                    <div className="form-control" key={name}>
                                        <label className="label py-1">
                                            <span className="label-text">{label}</span>
                                        </label>
                                        <input
                                            type={type}
                                            name={name}
                                            placeholder={placeholder}
                                            className="input input-bordered"
                                            value={formData[name]}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                ))}

                                {renderFooter && <div className="mt-4">{renderFooter}</div>}

                                {error && <p className="text-error">{error}</p>}

                                <button className="btn btn-neutral mt-4 w-full" type="submit">
                                    {buttonText}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
