import {NextResponse} from "next/server";
import {getRequestOptions, getTargetUrl} from "@/api/everhour/(support)/urlBuilder";


export async function GET() {
  const targetUrl = getTargetUrl('/users/me', null);
  const options = getRequestOptions();
  const response = await fetch(targetUrl, options).then(r => r.json());

  return NextResponse.json(response);
}
