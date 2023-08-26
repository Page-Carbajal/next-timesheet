export const getTargetUrl = function (endpoint: string, params: any = null): string {
  const baseUrl = process.env.EVERHOUR_API_BASEURL ?? 'https://api.everhour.com';
  const requestParams = new URLSearchParams(params ?? {});

  return baseUrl + endpoint + '?' + requestParams.toString();
}


export const getRequestOptions = function (method: string = 'GET'): RequestInit {
  const apiKey = process.env.EVERHOUR_API_KEY;
  const headers: HeadersInit = [
    ["X-Api-Key", apiKey ?? '']
  ];
  const options: RequestInit = {
    method: method,
    headers: headers,
  };

  return options;
}
