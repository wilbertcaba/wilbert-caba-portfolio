import React from "react";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function TestComponent() {
    const payload = await getPayload({ config });

    const users = await payload.find({
        collection: "users",
    });

    return (
        <div className="bg-green-500 p-4 text-green-100">
            Hey! This is a custom component.
            <h3>Users:</h3>
            <div className="flex gap-2">
                {users.docs.map((user) => {
                    return (
                        <div key={user.id} className="bg-green-700 p-2 rounded">
                            <p className="m-0">{user.email as string}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
