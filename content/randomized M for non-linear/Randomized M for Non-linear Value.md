---
tags:
  - Designed-M
  - Randomized-M
  - Non-Linear-Value
title: Randomized M for Non-linear Value
date: 2026-01-18
---
1. 本文目标：
![[Pasted image 20260118233812.png]]
2. 传统Randomized Measurement：$\mathrm{Tr}(\rho^2)$

	对 $\rho$ 施加一个 $U\sim Haar$, 如果是纯态，其在随机基底下的概率分布会涨落大；反之如果是 $\rho\sim I$, 概率分布涨落会很小，因此可以利用其二阶矩来估算纯度。
$$\mathbb{E}_U \left[ \sum_s P_U(s)^2 \right] = \frac{2}{d+1} \text{Tr}(\rho^2) + \frac{1}{d+1} (\text{Tr}\rho)^2.$$

3. 对于可观测量 $O$, 如果是二分可观测量，即本征值为 +1 和 -1，那么在其本征基下，
$$O = \begin{bmatrix} I_{d_+} & 0 \\ 0 & -I_{d_-} \end{bmatrix}$$
	并且 $\rho$ 在 $O$ 的本征基下，
$$\rho = \begin{bmatrix} \tilde{\rho}_+ & B \\ B^\dagger & \tilde{\rho}_- \end{bmatrix}$$
	其中 $\tilde{\rho}_+ = P_+ \rho P_+$ ，$\tilde{\rho}_- = P_- \rho P_-$ 。
	那么此时$$\text{Tr}(O\rho^2) = \text{Tr}(\tilde{\rho}_+^2 + B B^\dagger) - \text{Tr}(\tilde{\rho}_-^2 + B^\dagger B)= \text{Tr}(\tilde{\rho}_+^2) - \text{Tr}(\tilde{\rho}_-^2).$$
	即计算非线性量的任务转化为估算纯度的任务。

4. 对于更general的可观测量，可以证明：$$O = \sum_{k=1}^M c_k D_k,$$其中每个 $D_k$ 是二分可观测量。可以将 $c_{k}$ 对应的权重看做概率分布，根据这个概率分布抽样决定对哪一个二分可观测量观测。![[Pasted image 20260118235902.png]]

5. 电路实现：
	1. 对角化（Diagonalization / Map to Z）：任何泡利算符 $P$（比如 $X_1 Y_2 Z_3$）都可以通过一个 Clifford 门 $V$ 变换为单比特的 $Z$ 算符（比如 $Z_1$）。$$V P V^\dagger = Z_1 \otimes I_{2\dots N}$$物理意义： 这步操作把抽象的“+1/-1 本征子空间”映射到了物理上的 第1个量子比特是 $|0\rangle$ 还是 $|1\rangle$。
	2. 分治（Divide and Conquer）：一旦变换到了 $Z_1$ 形式，希尔伯特空间就自然裂开了：块 1 (+1)： 第1个比特固定为 $|0\rangle$，剩下的 $N-1$ 个比特构成一个自由度。块 2 (-1)： 第1个比特固定为 $|1\rangle$，剩下的 $N-1$ 个比特构成另一个自由度。
	3. 随机化（Randomization）：现在，“块内随机”变得非常简单——只需要对剩下的 $N-1$ 个比特施加随机幺正演化 $U'$ 即可。第1个比特保持不动（或者只用来做测量标记）。
	![[Pasted image 20260119000110.png]]
Reference: https://arxiv.org/pdf/2505.09206