export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('sysgame.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('sysgame.token');
        localStorage.removeItem('sysgame.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('sysgame.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('sysgame.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('sysgame.user', JSON.stringify(user));
    }

}