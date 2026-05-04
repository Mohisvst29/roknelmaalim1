
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import InternalLinkMapping from '@/models/InternalLinkMapping';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await request.json();

        const updatedMapping = await InternalLinkMapping.findByIdAndUpdate(
            params.id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedMapping) {
            return NextResponse.json({ error: 'Mapping not found' }, { status: 404 });
        }

        return NextResponse.json(updatedMapping);
    } catch (error) {
        console.error('Failed to update link mapping:', error);
        return NextResponse.json({ error: 'Failed to update link mapping' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const deleted = await InternalLinkMapping.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json({ error: 'Mapping not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Mapping deleted successfully' });
    } catch (error) {
        console.error('Failed to delete link mapping:', error);
        return NextResponse.json({ error: 'Failed to delete link mapping' }, { status: 500 });
    }
}
