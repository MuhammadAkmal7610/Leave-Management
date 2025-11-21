import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'jane_doe',
            email: 'jane@example.com',
            password: 'password123',
        },
    });

    // Seed leave requests
    await prisma.leave.createMany({
        data: [
            {
                userId: user1.id,
                startDate: new Date('2023-10-01'),
                endDate: new Date('2023-10-05'),
                reason: 'Vacation',
            },
            {
                userId: user2.id,
                startDate: new Date('2023-10-10'),
                endDate: new Date('2023-10-12'),
                reason: 'Medical',
            },
        ],
    });

    // Seed chat messages
    await prisma.chat.createMany({
        data: [
            {
                senderId: user1.id,
                receiverId: user2.id,
                message: 'Hey, how are you?',
                timestamp: new Date(),
            },
            {
                senderId: user2.id,
                receiverId: user1.id,
                message: 'I am good, thanks! How about you?',
                timestamp: new Date(),
            },
        ],
    });

    console.log('Seeding completed.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });