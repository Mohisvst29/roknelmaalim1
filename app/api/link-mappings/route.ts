import { NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
import connectDB from '@/lib/db';
import InternalLinkMapping from '@/models/InternalLinkMapping';

export async function GET() {
    try {
        const db = await connectDB();
        if (!db) return NextResponse.json([]);
        const mappings = await InternalLinkMapping.find({}).sort({ priority: -1, createdAt: -1 });
        return NextResponse.json(mappings);
    } catch (error) {
        console.error('Failed to fetch link mappings:', error);
        return NextResponse.json({ error: 'Failed to fetch link mappings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Basic validation
        if (!body.keyword || !body.url) {
            return NextResponse.json({ error: 'Keyword and URL are required' }, { status: 400 });
        }

        // Check if keyword already exists
        const existing = await InternalLinkMapping.findOne({ keyword: body.keyword });
        if (existing) {
            return NextResponse.json({ error: 'Keyword already exists' }, { status: 400 });
        }

        const newMapping = new InternalLinkMapping(body);
        await newMapping.save();

        return NextResponse.json(newMapping, { status: 201 });
    } catch (error) {
        console.error('Failed to create link mapping:', error);
        return NextResponse.json({ error: 'Failed to create link mapping' }, { status: 500 });
    }
}
