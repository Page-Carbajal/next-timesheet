import {NextResponse} from "next/server";
import {getRequestOptions, getTargetUrl} from "@/api/everhour/(support)/urlBuilder";


export async function GET() {
  const params = {
    from: '2023-08-25',
    to: '2023-09-09',
    limit: 500,
    page: 1
  }
  const targetUrl = getTargetUrl('/users/1243214/time', params);
  const options = getRequestOptions();
  const response = await fetch(targetUrl, options).then(r => r.json());

  return NextResponse.json(response);
}
