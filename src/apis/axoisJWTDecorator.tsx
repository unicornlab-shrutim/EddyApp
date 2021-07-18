import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import * as microsoftTeams from "@microsoft/teams-js";

export class AxiosJWTDecorator {
  public async get<T = any, R = AxiosResponse<T>>(
    baseUrl: string,
    resource: string,
    source: string,
    queryString: string = "",
    handleError: boolean = true,
    needAuthorizationHeader: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<any> {
    try {
      if (needAuthorizationHeader) {
        config = await this.setupAuthorizationHeader(config, source);
      }
      var result = await axios.get(baseUrl + resource + queryString, {
        headers: {
          Authorization: `Bearer ${config}`,
        },
      });

      if (result.data.Error != null) {
        this.handleError(result.data.Error);
      }
      return result;
    } catch (error) {
      console.log("error", error);
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async delete<T = any, R = AxiosResponse<T>>(
    baseUrl: string,
    resource: string,
    source: string,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      config = await this.setupAuthorizationHeader(config, source);
      return await axios.delete(baseUrl + resource, {
        headers: {
          Authorization: `Bearer ${config}`,
        },
      });
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async post<T = any, R = AxiosResponse<T>>(
    baseUrl: string,
    resource: string,
    source: string,
    data?: any,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<any> {
    try {
      config = await this.setupAuthorizationHeader(config, source);
      var result = await axios.post(baseUrl + resource, data, {
        headers: {
          Authorization: `Bearer ${config}`,
        },
      });
      if (result.data.Error != null) {
        this.handleError(result.data.Error);
      }
      return result;
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public async put<T = any, R = AxiosResponse<T>>(
    baseUrl: string,
    resource: string,
    source: string,
    data?: any,
    handleError: boolean = true,
    config?: AxiosRequestConfig
  ): Promise<R> {
    try {
      config = await this.setupAuthorizationHeader(config, source);
      return await axios.put(baseUrl + resource, data, {
        headers: {
          Authorization: `Bearer ${config}`,
        },
      });
    } catch (error) {
      if (handleError) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  public handleError(error: any): void {
    if (error.response) {
      const errorStatus = error.response.status;
      if (errorStatus === 403) {
        window.location.href = `/errorpage/403`;
      } else if (errorStatus === 401) {
        window.location.href = `/errorpage/401`;
      } else {
        window.location.href = `/errorpage/errormsg/${error}`;
      }
    } else {
      window.location.href = `/errorpage/errormsg/${error}`;
    }
  }

  private async setupAuthorizationHeader(
    config?: AxiosRequestConfig,
    source?: string
  ): Promise<AxiosRequestConfig> {
    microsoftTeams.initialize();

    return new Promise<AxiosRequestConfig>((resolve, reject) => {
      const authTokenRequest = {
        successCallback: (token: any) => {
          //config = { headers: { Authorization: `Bearer ${token}` } };
          resolve(token);
        },
        failureCallback: (error: string) => {
          // When the getAuthToken function returns a "resourceRequiresConsent" error,
          // it means Azure AD needs the user's consent before issuing a token to the app.
          // The following code redirects the user to the "Sign in" page where the user can grant the consent.
          // Right now, the app redirects to the consent page for any error.
          console.error("Error from getAuthToken: ", error);
          window.location.href = `/login/${source}`;
        },
        resources: [],
      };
      microsoftTeams.authentication.getAuthToken(authTokenRequest);
    });
  }
}

const axiosJWTDecoratorInstance = new AxiosJWTDecorator();
export default axiosJWTDecoratorInstance;
