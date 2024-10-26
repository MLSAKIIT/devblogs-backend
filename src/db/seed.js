async function seedDB() {
    try {
        const password = "alice123";
        const hashedPassword = await bcrypt.hash(password, 12);

        // Upsert user and get the user document
        const user = await User.findOneAndUpdate(
            { username: "alice" },
            {
                $setOnInsert: {
                    username: "alice",
                    email: "alice@example.com",
                    password: hashedPassword
                }
            },
            { upsert: true, new: true }
        );

        // Upsert for the first blog post
        const blog1 = await Blogs.updateOne(
            { user: user._id, title: "How to be a better dev in life." },
            {
                $setOnInsert: {
                    content: "In order to become a better dev or a 100xdev what you need is curiosity to try something, new something different."
                }
            },
            { upsert: true }
        );

        // Upsert for the second blog post
        const blog2 = await Blogs.updateOne(
            { user: user._id, title: "Tips for Effective Team Collaboration." },
            {
                $setOnInsert: {
                    content: "Effective collaboration in a team requires clear communication, mutual respect, and a shared goal. Here are some tips to enhance your teamwork."
                }
            },
            { upsert: true }
        );

        console.log("> User created:", "Email:", user.email, "Pass:", password);
        console.log("> Blog created (1):", blog1.upsertedId || blog1.acknowledged);
        console.log("> Blog created (2):", blog2.upsertedId || blog2.acknowledged);

    } catch (error) {
        console.log("> Failed to seed DB:");
        console.error(error);
    }
}

export default seedDB;