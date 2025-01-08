import { action } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const page = parseInt(params.get("page") || '1')
    
    try{
        const data = await action.academia().findMany(page);

        return NextResponse.json(data, {status:200})
    }catch(error){

    }
}