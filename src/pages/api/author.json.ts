import type { APIRoute } from 'astro';
import google from 'googlethis';

export const prerender = false;

// TODO: improve.
export const GET: APIRoute = async ({ request }) => {
  try {
    const author = new URL(request.url).searchParams.get('author');

    if (!author) {
      return new Response(JSON.stringify({ error: 'Bad Request. Missing author query parameter.' }), {
        status: 400,
        statusText: 'Bad Request. Missing author query parameter.'
      });
    }

    const options = {
      page: 0, 
      safe: false,
      parse_ads: false,
      additional_params: { 
        hl: 'es' 
      }
    }
  
    const { knowledge_panel: authorInfo } = await google.search(author, options);
  
    if (!authorInfo) {
      return new Response(null, {
        status: 404,
        statusText: 'Not Found'
      });
    }

    const authorResponse = {
      name: authorInfo.title,
      description: authorInfo.description,
      image: authorInfo.images[0]?.url || '',
      url: authorInfo.url
    }

    return new Response(
      JSON.stringify(authorResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
}