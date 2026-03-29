import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  
  //There are 2 API keys for Korean and English
  const API_KEY = process.env.JUSO_API_KEY; 

  if (!keyword) {
    return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
  }

  const query = new URLSearchParams({
    confmKey: API_KEY as string,
    currentPage: '1',
    countPerPage: '10',
    keyword: keyword,
    resultType: 'json'
  });

  try {
    //API for Korean 'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do'
    //API for English 'https://www.juso.go.kr/addrlink/addrEngApiJsonp.do'

    const res = await fetch(`https://www.juso.go.kr/addrlink/addrEngApiJsonp.do?${query}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}